"use client";

import React, { useState } from "react";

export default function Calculator() {
  const [caseload, setCaseload] = useState(60);
  const [rate, setRate] = useState(300);
  const [clients, setClients] = useState(50);
  const [hoursPerClient, setHoursPerClient] = useState(1);
  const [overdueInvoices, setOverdueInvoices] = useState(50);

  const annualRevenue = caseload * rate * 12;
  const timeSaved = clients * hoursPerClient * 12;
  const extraCases = caseload * 4.6; // vibecode logic

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-black/10 backdrop-blur-sm">
        {/* toggle pill */}
        <div className="mb-8 flex w-fit rounded-full bg-indigo-100 p-1">
          <button className="rounded-full bg-indigo-600 px-5 py-1.5 text-sm font-medium text-white">
            Annually
          </button>
          <button className="px-5 py-1.5 text-sm font-medium text-indigo-600">
            Monthly
          </button>
        </div>

        {/* grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* revenue block */}
          <div>
            <p className="text-sm font-semibold text-indigo-500">INCREASE REVENUE BY</p>
            <p className="mt-1 text-4xl font-extrabold text-indigo-500">
              ₱{annualRevenue.toLocaleString()}
            </p>
            <p className="text-sm font-semibold text-indigo-500">ANNUALLY</p>

            <hr className="my-8 border-indigo-100" />

            <div className="flex justify-between text-indigo-500">
              <div>
                <p className="text-xs font-medium">TAKE ON</p>
                <p className="mt-1 text-3xl font-bold">{Math.round(extraCases)}</p>
                <p className="text-xs font-medium">MORE CASES</p>
              </div>
              <div className="border-l border-indigo-100 pl-8">
                <p className="text-xs font-medium">RECLAIM</p>
                <p className="mt-1 text-3xl font-bold">{timeSaved}</p>
                <p className="text-xs font-medium">HOURS ANNUALLY</p>
              </div>
            </div>

            <button className="mt-10 w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700">
              Start saving today
            </button>
          </div>

          {/* sliders block */}
          <div className="space-y-8">
            {[
              {
                label: "Estimated monthly caseload*",
                value: `${caseload} cases`,
                onChange: (v: number) => setCaseload(v),
                current: caseload,
                min: 10,
                max: 100,
              },
              {
                label: "Billable rate*",
                value: `₱${rate}`,
                onChange: (v: number) => setRate(v),
                current: rate,
                min: 100,
                max: 1000,
              },
              {
                label: "Clients billed monthly*",
                value: `${clients} clients`,
                onChange: (v: number) => setClients(v),
                current: clients,
                min: 10,
                max: 200,
              },
              {
                label: "Time spent invoicing each client*",
                value: `${hoursPerClient} hour`,
                onChange: (v: number) => setHoursPerClient(v),
                current: hoursPerClient,
                min: 0,
                max: 10,
              },
              {
                label: "Overdue invoices*",
                value: `${overdueInvoices} invoices`,
                onChange: (v: number) => setOverdueInvoices(v),
                current: overdueInvoices,
                min: 0,
                max: 100,
              },
            ].map(({ label, value, current, min, max, onChange }) => (
              <div key={label}>
                <div className="flex justify-between text-sm font-medium text-indigo-500">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <input
                  type="range"
                  className="w-full accent-indigo-600"
                  min={min}
                  max={max}
                  value={current}
                  onChange={(e) => onChange(Number(e.target.value))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
