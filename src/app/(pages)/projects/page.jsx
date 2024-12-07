"use client";
import CustomButton from "@/app/components/CustomButton";
import { useTranslation } from "@/app/context/TranslationContext";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteProject, getProjects } from "@/actions/projectAction";
import { Spin } from "antd";
import { format } from "date-fns";
import DeleteButton from "@/app/components/delete-button/DeleteButton";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects on component mount
  async function fetchProjects() {
    try {
      const { projects } = await getProjects();
      setProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProjects();
  }, []);

  // Navigate to project details page
  const handleProjectClick = (e, projectId) => {
    if (e.target.closest(".prevent-row-click")) {
      return;
    }
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="flex flex-col h-full w-full p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{t("projects")}</h1>
        <CustomButton
          title="Add Project"
          icon={() => <PlusCircle size={20} />}
          fun={() => router.push("/projects/add-project")}
        />
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 text-center">No projects available.</p>
        ) : (
          projects.map((project) => {
            const images = project.images ? JSON.parse(project.images) : [];
            const firstImageUrl =
              images[0]?.fileUrl ||
              "https://t4.ftcdn.net/jpg/03/00/10/35/360_F_300103505_oBLUa4dEG8mFdP60givbyNdoy7aHFmuu.jpg";

            return (
              <Card
                key={project.$id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transition-colors duration-300"
                onClick={(e) => handleProjectClick(e, project.$id)}
              >
                <div className="flex h-[200px]">
                  <div className="w-1/3 relative">
                    <Image
                      src={firstImageUrl}
                      alt={project.projectName || "Project Image"}
                      width={400}
                      height={200}
                      className="object-cover h-full"
                    />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between bg-white dark:bg-gray-800">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {project.projectName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {project.projectInformation ||
                          "No description provided."}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className="text-green-500 dark:text-green-400">
                          {project.status || "Active"}
                        </span>
                        <span className="text-gray-500 dark:text-gray-300">
                          Start Date:{" "}
                          {format(
                            new Date(project.$createdAt),
                            "dd MMMM yyyy"
                          ) || "N/A"}
                        </span>
                      </div>
                      <DeleteButton
                        handleDelete={(e) => {
                          deleteProject(project.$id);
                        }}
                        afterDel={fetchProjects}
                        className="prevent-row-click"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
