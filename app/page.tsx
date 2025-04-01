"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"

interface JournalEntry {
  date: string
  gratitude: string[]
  connections: string[]
  goals: string[]
}

export default function Home() {
  const router = useRouter()
  const [gratitude, setGratitude] = useState<string[]>(["", "", ""])
  const [connections, setConnections] = useState<string[]>(["", "", ""])
  const [goals, setGoals] = useState<string[]>(["", "", ""])
  const today = format(new Date(), "yyyy-MM-dd")

  useEffect(() => {
    // Load today's entry if it exists
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      const entries: Record<string, JournalEntry> = JSON.parse(savedEntries)
      if (entries[today]) {
        setGratitude(entries[today].gratitude)
        setConnections(entries[today].connections)
        setGoals(entries[today].goals)
      }
    }
  }, [today])

  const handleGratitudeChange = (index: number, value: string) => {
    const newGratitude = [...gratitude]
    newGratitude[index] = value
    setGratitude(newGratitude)
  }

  const handleConnectionsChange = (index: number, value: string) => {
    const newConnections = [...connections]
    newConnections[index] = value
    setConnections(newConnections)
  }

  const handleGoalsChange = (index: number, value: string) => {
    const newGoals = [...goals]
    newGoals[index] = value
    setGoals(newGoals)
  }

  const saveEntry = () => {
    const savedEntries = localStorage.getItem("journalEntries")
    const entries: Record<string, JournalEntry> = savedEntries ? JSON.parse(savedEntries) : {}

    entries[today] = {
      date: today,
      gratitude,
      connections,
      goals,
    }

    localStorage.setItem("journalEntries", JSON.stringify(entries))
    alert("Journal entry saved successfully!")
  }

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-[#3D1C02] via-[#8B4513] to-[#D2691E]">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-sans font-medium text-amber-100">Daily Gratitude Journal</h1>
          <p className="text-amber-200 mt-2">{format(new Date(), "MMMM d, yyyy")}</p>
          <div className="flex justify-center mt-4 space-x-4">
            <Button
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-amber-100 border-amber-500"
              onClick={() => router.push("/archive")}
            >
              View Archive
            </Button>
          </div>
        </div>

        <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-stone-800 font-sans">Gratitude</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-stone-600 text-sm">What three things are you grateful for today?</p>
            {gratitude.map((item, index) => (
              <Input
                key={`gratitude-${index}`}
                placeholder={`I'm grateful for...`}
                value={item}
                onChange={(e) => handleGratitudeChange(index, e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            ))}
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-stone-800 font-sans">Connections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-stone-600 text-sm">Who would you like to connect with today?</p>
            {connections.map((item, index) => (
              <Input
                key={`connection-${index}`}
                placeholder={`I'll reach out to...`}
                value={item}
                onChange={(e) => handleConnectionsChange(index, e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            ))}
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-white/80 backdrop-blur-sm shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-stone-800 font-sans">Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-stone-600 text-sm">What three actions will you take today?</p>
            {goals.map((item, index) => (
              <Input
                key={`goal-${index}`}
                placeholder={`I will...`}
                value={item}
                onChange={(e) => handleGoalsChange(index, e.target.value)}
                className="border-amber-200 focus-visible:ring-amber-500"
              />
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-center pt-4">
          <Button onClick={saveEntry} className="bg-amber-600 hover:bg-amber-700 text-white px-8">
            <Save className="mr-2 h-4 w-4" /> Save Journal Entry
          </Button>
        </div>
      </div>
    </main>
  )
}

