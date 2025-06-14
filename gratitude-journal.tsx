"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Users, CheckCircle, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

interface DayEntry {
  gratefulFor: string[]
  peopleAppreciate: string[]
  toDoToday: string[]
  date: string
}

export default function Component() {
  const router = useRouter()
  const [gratefulFor, setGratefulFor] = useState<string[]>(["", "", ""])
  const [peopleAppreciate, setPeopleAppreciate] = useState<string[]>(["", "", ""])
  const [toDoToday, setToDoToday] = useState<string[]>(["", "", ""])
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  // Modern font stacks
  const displayFont = "'Futura', 'Century Gothic', 'Trebuchet MS', sans-serif" // Modern elegant font
  const bodyFont = "'Roboto Light', 'Helvetica Neue Light', 'Helvetica Light', 'Segoe UI Light', sans-serif" // Light sans-serif

  const updateGratefulFor = (index: number, value: string) => {
    const newArray = [...gratefulFor]
    newArray[index] = value
    setGratefulFor(newArray)
  }

  const updatePeopleAppreciate = (index: number, value: string) => {
    const newArray = [...peopleAppreciate]
    newArray[index] = value
    setPeopleAppreciate(newArray)
  }

  const updateToDoToday = (index: number, value: string) => {
    const newArray = [...toDoToday]
    newArray[index] = value
    setToDoToday(newArray)
  }

  const handleSave = () => {
    setIsSaving(true)

    // Get existing entries from localStorage
    const existingEntriesJSON = localStorage.getItem("gratitudeEntries")
    const existingEntries: Record<string, DayEntry> = existingEntriesJSON ? JSON.parse(existingEntriesJSON) : {}

    // Create today's entry
    const today = new Date().toISOString().split("T")[0]
    const newEntry: DayEntry = {
      gratefulFor,
      peopleAppreciate,
      toDoToday,
      date: today,
    }

    // Save to localStorage
    const updatedEntries = {
      ...existingEntries,
      [today]: newEntry,
    }

    localStorage.setItem("gratitudeEntries", JSON.stringify(updatedEntries))

    // Show success message
    setSaveMessage("Entry saved successfully! ✨")
    setTimeout(() => {
      setSaveMessage("")
    }, 3000)

    setIsSaving(false)
  }

  const viewAllEntries = () => {
    router.push("/all-entries")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight"
            style={{ fontFamily: displayFont }}
          >
            ✨ Daily Gratitude Journal ✨
          </h1>
          <p className="text-lg text-purple-600 font-light" style={{ fontFamily: bodyFont }}>
            Reflect on today's blessings 🌸
          </p>
        </div>

        {/* Three Categories */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Category 1: Things I'm Grateful For */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-200/60 to-rose-200/60 backdrop-blur-sm">
            <CardHeader className="pb-3 text-center">
              <div className="flex justify-center mb-2">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <CardTitle
                className="text-xl font-normal text-purple-700 tracking-wide"
                style={{ fontFamily: displayFont, fontWeight: 300 }}
              >
                Things I'm Grateful For
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={`grateful-${index}`} className="relative">
                  <Input
                    value={gratefulFor[index]}
                    onChange={(e) => updateGratefulFor(index, e.target.value)}
                    placeholder={`I'm grateful for...`}
                    className="border-2 border-pink-200 rounded-xl bg-white/70 text-purple-800 placeholder:text-purple-400 focus:border-pink-300 focus:ring-pink-200 font-light pl-8"
                    style={{ fontFamily: bodyFont }}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 font-light">
                    {index + 1}.
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Category 2: People I Appreciate */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-200/60 to-blue-200/60 backdrop-blur-sm">
            <CardHeader className="pb-3 text-center">
              <div className="flex justify-center mb-2">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle
                className="text-xl font-normal text-purple-700 tracking-wide"
                style={{ fontFamily: displayFont, fontWeight: 300 }}
              >
                People I Appreciate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={`people-${index}`} className="relative">
                  <Input
                    value={peopleAppreciate[index]}
                    onChange={(e) => updatePeopleAppreciate(index, e.target.value)}
                    placeholder={`I appreciate...`}
                    className="border-2 border-purple-200 rounded-xl bg-white/70 text-purple-800 placeholder:text-purple-400 focus:border-purple-300 focus:ring-purple-200 font-light pl-8"
                    style={{ fontFamily: bodyFont }}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 font-light">
                    {index + 1}.
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Category 3: Things I'll Get Done Today */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-200/60 to-cyan-200/60 backdrop-blur-sm">
            <CardHeader className="pb-3 text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle
                className="text-xl font-normal text-purple-700 tracking-wide"
                style={{ fontFamily: displayFont, fontWeight: 300 }}
              >
                I've Got This!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={`todo-${index}`} className="relative">
                  <Input
                    value={toDoToday[index]}
                    onChange={(e) => updateToDoToday(index, e.target.value)}
                    placeholder={`I've got this...`}
                    className="border-2 border-blue-200 rounded-xl bg-white/70 text-purple-800 placeholder:text-purple-400 focus:border-blue-300 focus:ring-blue-200 font-light pl-8"
                    style={{ fontFamily: bodyFont }}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 font-light">
                    {index + 1}.
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Save Button and Message */}
        <div className="text-center space-y-2">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white border-0 rounded-2xl px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 tracking-wide"
            style={{ fontFamily: displayFont }}
          >
            <Heart className="w-5 h-5 mr-2" />
            {isSaving ? "Saving..." : "Save Today's Gratitude 🌺"}
          </Button>

          {saveMessage && (
            <div className="text-green-600 animate-fade-in font-light" style={{ fontFamily: bodyFont }}>
              {saveMessage}
            </div>
          )}
        </div>

        {/* See All Entries Button */}
        <div className="text-center pt-4">
          <Button
            onClick={viewAllEntries}
            variant="outline"
            className="border-purple-200 hover:bg-purple-50 text-purple-700 tracking-wide"
            style={{ fontFamily: displayFont }}
          >
            <Calendar className="w-4 h-4 mr-2" />
            See All Entries
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-purple-500 tracking-wide" style={{ fontFamily: displayFont, fontSize: "16px" }}>
            ✨ Gratitude turns what we have into enough ✨
          </p>
        </div>
      </div>
    </div>
  )
}
