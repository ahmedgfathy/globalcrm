'use client';

import { Building2, Users, FileText, Table2 } from 'lucide-react';
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import UnitReports from '@/app/components/reports/unit-reports';
import { getAllSettings } from '@/actions/filterSettings';
import LeadReports from '@/app/components/reports/lead-reports';

export default function SelectionType() {
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState({})
  const [format, setFormat] = useState(null);
  const [unitsOptions, setUnitsOptions] = useState({})
  const [step, setStep] = useState(1);
  const [report, setReport] = useState({})
    useEffect(() => {
      const fetchData = async () => {
        const documents = await getAllSettings()
        setOptions(JSON.parse(documents[0].leadSettings))
        setUnitsOptions(JSON.parse(documents[0].unitSettings))
      }
      fetchData()
    }, [])
    const handleChange = (field, value) => {
      setReport((prev) => ({
          ...prev,
          [field]: value,
      }));
  };
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
const handleSave = async()=>{
  console.log(report)
}
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="space-y-8">
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            3
          </div>
        </div>

        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className={`cursor-pointer transition-all dark:bg-cardbgDark ${
                selected === 'units' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelected('units')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                <Building2 className="w-12 h-12" />
                <h3 className="text-xl font-semibold">Units</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Manage and track your property units
                </p>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all dark:bg-cardbgDark ${
                selected === 'leads' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelected('leads')}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                <Users className="w-12 h-12" />
                <h3 className="text-xl font-semibold">Leads</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Manage your client relationships
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            {selected === 'units' ? (<UnitReports options={unitsOptions} handleChange={handleChange} />) : (<LeadReports options={options} handleChange={handleChange} />)}
          </div>
        )}

        {step === 3 && (
          <div className="grid md:grid-cols-2 gap-6">
          <Card
            className={`cursor-pointer transition-all dark:bg-cardbgDark ${
              format === 'pdf' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setFormat('pdf')}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
              <FileText className="w-12 h-12" />
              <h3 className="text-xl font-semibold">PDF Report</h3>
              <p className="text-sm text-muted-foreground text-center">
                Download your report as a PDF document
              </p>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all dark:bg-cardbgDark ${
              format === 'table' ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setFormat('table')}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
              <Table2 className="w-12 h-12" />
              <h3 className="text-xl font-semibold">Table View</h3>
              <p className="text-sm text-muted-foreground text-center">
                View your report in an interactive table format
              </p>
            </CardContent>
          </Card>
        </div>
        )}

        <div className="flex justify-between">
          <Button
            className={`px-6 py-2 rounded-md ${
              step > 1
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
            onClick={handleBack}
            disabled={step <= 1}
          >
            Back
          </Button>

          <Button
            className={`px-6 py-2 rounded-md ${
             
                'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-[#5be49b1a] dark:text-[#5be49b]'
                
            }`}
            onClick={step >= 3 ? handleSave :handleNext}
            // disabled={step >= 3}
          >
            {step < 3 ? 'Continue to Next Step' : 'Finish'}
          </Button>
        </div>
      </div>
    </div>
  );
}
