"use client";
import { useState, useEffect, useRef } from "react";
import "ol/ol.css";
import { Collection, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import { Translate } from "ol/interaction";
import ProjectForm from "@/app/components/ProjectForm";
import { getProjectById, updateProject } from "@/actions/projectAction";
import { useToast } from "@/hooks/use-toast";


export default function ProjectUpdate({ params: paramsPromise }) {
  const {toast} = useToast()
  const [params, setParams] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [project, setProject] = useState({
    projectName: "",
    companyName: "",
    companyInformation: "",
    projectInformation: "",
    latitude: "",
    longitude: ""
  });
  const [coordinates, setCoordinates] = useState({
    lat: 31.106573247052467,
    lng: 30.947136106713348,
  });
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  // Unwrap params
  useEffect(() => {
    paramsPromise
      .then((resolvedParams) => setParams(resolvedParams))
      .catch((error) => console.error("Error resolving params:", error));
  }, [paramsPromise]);

  useEffect(() => {
    if (!params) return;

    async function fetchProject() {
      try {
        const projectData = await getProjectById(params.id);
        setProject(projectData);
        setCoordinates({
          lat: parseFloat(projectData.latitude),
          lng: parseFloat(projectData.longitude),
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    }

    fetchProject();
  }, [params]);

  useEffect(() => {
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const marker = new Feature({
      geometry: new Point(fromLonLat([coordinates.lng, coordinates.lat])),
    });

    marker.setStyle(
      new Style({
        image: new Icon({
          src: "/marker.png",
          scale: 1,
        }),
      })
    );

    vectorSource.addFeature(marker);
    markerRef.current = marker;

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([coordinates.lng, coordinates.lat]),
        zoom: 13,
      }),
    });

    const translateInteraction = new Translate({
      features: new Collection([marker]),
    });

    translateInteraction.on("translateend", (event) => {
      const [lon, lat] = toLonLat(event.coordinate);
      setCoordinates({ lat, lng: lon });
    });

    mapInstance.current.addInteraction(translateInteraction);

    return () => {
      mapInstance.current.setTarget(null);
      mapInstance.current.removeInteraction(translateInteraction);
      vectorSource.clear();
    };
  }, [coordinates]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current
        .getGeometry()
        .setCoordinates(fromLonLat([coordinates.lng, coordinates.lat]));
      mapInstance.current
        .getView()
        .setCenter(fromLonLat([coordinates.lng, coordinates.lat]));
    }
  }, [coordinates]);

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImages(files);
      setImagePreviews(previews);
    }
  };

  const handleLatitudeChange = (e) => {
    const lat = parseFloat(e.target.value);
    if (!isNaN(lat)) {
      setCoordinates((prev) => ({ ...prev, lat }));
    } else {
      alert("Invalid latitude value");
    }
  };

  const handleLongitudeChange = (e) => {
    const lng = parseFloat(e.target.value);
    if (!isNaN(lng)) {
      setCoordinates((prev) => ({ ...prev, lng }));
    } else {
      alert("Invalid longitude value");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProject = {
      ...project,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };

    console.log("Project Data:", updatedProject);

    try {
      await updateProject(params.id, updatedProject);
      toast({
        variant: "success",
        title: "Success Update project",
        description: `project updated successfuly`,
        status: "success",
      });
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        variant: "destructive",
        title: "Error updating project",
        description: error.message || "Error updating project",
        status: "error",
      })
    }
  };

  if (!params) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <ProjectForm
        handleImageUpload={handleImageUpload}
        imagePreviews={imagePreviews}
        handleLatitudeChange={handleLatitudeChange}
        coordinates={coordinates}
        mapRef={mapRef}
        handleLongitudeChange={handleLongitudeChange}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        project={project}
        buttonText={"Update Project"} 
      />
    </div>
  );
}
