"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

interface JournalEntry {
  date: string
  gratitude: string[]
  connections: string[]
  goals: string[]
}

export default function Archive() {
  const router = useRouter()
  const [entries, setEntries] = useState<Record<string, JournalEntry>>({})
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  useEffect(() => {
    // Load all entries
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  useEffect(() => {
    if (selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd")
      if (entries[dateString]) {
        setSelectedEntry(entries[dateString])
      } else {
        setSelectedEntry(null)
      }
    }
  }, [selectedDate, entries])

  // Function to determine which dates have entries
  const hasEntryDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    return dateString in entries
  }

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-[#3D1C02] via-[#8B4513] to-[#D2691E]">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="text-amber-100 hover:text-amber-200 hover:bg-amber-900/30"
            onClick={() => router.push("/")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Journal
          </Button>
          <h1 className="text-2xl md:text-3xl font-sans font-medium text-amber-100">Journal Archive</h1>
          <div className="w-[100px]"></div> {/* Spacer for centering */}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-stone-800 font-sans">Select a Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{ hasEntry: hasEntryDate }}
                modifiersStyles={{
                  hasEntry: {
                    fontWeight: "bold",
                    backgroundColor: "rgba(245, 158, 11, 0.3)",
                    color: "#fbbf24",
                  },
                }}
                className="rounded-md border-amber-200"
              />
            </CardContent>
          </Card>

          {selectedEntry ? (
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-stone-800 font-sans">
                  {format(parseISO(selectedEntry.date), "MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-stone-800 font-sans">Gratitude</h3>
                  <ul className="space-y-1 pl-5 list-disc text-stone-600">
                    {selectedEntry.gratitude.map((item, index) => item && <li key={`gratitude-${index}`}>{item}</li>)}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-stone-800 font-sans">Connections</h3>
                  <ul className="space-y-1 pl-5 list-disc text-stone-600">
                    {selectedEntry.connections.map(
                      (item, index) => item && <li key={`connection-${index}`}>{item}</li>,
                    )}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-stone-800 font-sans">Goals</h3>
                  <ul className="space-y-1 pl-5 list-disc text-stone-600">
                    {selectedEntry.goals.map((item, index) => item && <li key={`goal-${index}`}>{item}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center">
              <CardContent className="text-center p-8">
                <p className="text-stone-600">
                  {selectedDate ? "No journal entry for this date." : "Select a date to view your journal entry."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}

