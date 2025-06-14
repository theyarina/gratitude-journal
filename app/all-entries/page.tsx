"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ArrowLeft, Heart, Users, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface DayEntry {
  gratefulFor: string[]
  peopleAppreciate: string[]
  toDoToday: string[]
  date: string
}

export default function AllEntries() {
  const router = useRouter()
  const [entries, setEntries] = useState<Record<string, DayEntry>>({})
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Modern font stacks
  const displayFont = "'Futura', 'Century Gothic', 'Trebuchet MS', sans-serif" // Modern elegant font
  const bodyFont = "'Roboto Light', 'Helvetica Neue Light', 'Helvetica Light', 'Segoe UI Light', sans-serif" // Light sans-serif

  useEffect(() => {
    // Load entries from localStorage
    const entriesJSON = localStorage.getItem("gratitudeEntries")
    if (entriesJSON) {
      setEntries(JSON.parse(entriesJSON))
    }
  }, [])

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentMonth(newMonth)
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const today = new Date().toISOString().split("T")[0]

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]
      const hasEntry = entries[dateStr] !== undefined

      days.push({
        date,
        dateStr,
        isCurrentMonth: date.getMonth() === month,
        isToday: dateStr === today,
        isSelected: dateStr === selectedDate,
        hasEntry,
      })
    }

    return days
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/")} variant="ghost" className="text-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Button>
          <h1
            className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight"
            style={{ fontFamily: displayFont }}
          >
            All Gratitude Entries
          </h1>
          <div className="w-[100px]"></div> {/* Spacer for alignment */}
        </div>

        {/* Calendar */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button onClick={() => navigateMonth("prev")} variant="ghost" size="sm" className="text-purple-600">
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <CardTitle className="text-center text-purple-700 tracking-wide" style={{ fontFamily: displayFont }}>
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </CardTitle>

              <Button onClick={() => navigateMonth("next")} variant="ghost" size="sm" className="text-purple-600">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-purple-600 p-2"
                  style={{ fontFamily: displayFont }}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  onClick={() => day.hasEntry && setSelectedDate(day.dateStr)}
                  disabled={!day.hasEntry}
                  className={`
                    p-3 text-sm rounded-lg transition-all duration-200 relative
                    ${day.isCurrentMonth ? "text-purple-800" : "text-purple-300"}
                    ${day.isToday ? "bg-gradient-to-r from-pink-200 to-purple-200 font-bold" : ""}
                    ${day.isSelected ? "bg-gradient-to-r from-purple-300 to-pink-300 text-white" : ""}
                    ${day.hasEntry ? "hover:bg-purple-100 cursor-pointer" : "opacity-50 cursor-default"}
                  `}
                  style={{ fontFamily: bodyFont }}
                >
                  {day.date.getDate()}
                  {day.hasEntry && <div className="absolute top-1 right-1 w-2 h-2 bg-pink-400 rounded-full"></div>}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Entry */}
        {selectedDate && entries[selectedDate] && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-700 tracking-wide" style={{ fontFamily: displayFont }}>
                {formatDate(selectedDate)}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Things I'm Grateful For */}
              <div className="space-y-3">
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <Heart className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="text-lg font-normal text-pink-500 tracking-wide" style={{ fontFamily: displayFont }}>
                    Things I'm Grateful For
                  </h3>
                </div>
                <ul className="space-y-2">
                  {entries[selectedDate].gratefulFor.map((item, index) => (
                    <li
                      key={`grateful-${index}`}
                      className={`p-3 bg-pink-50/60 rounded-xl border border-pink-100 font-light ${
                        !item && "text-gray-400 italic"
                      }`}
                      style={{ fontFamily: bodyFont }}
                    >
                      {index + 1}. {item || "No entry"}
                    </li>
                  ))}
                </ul>
              </div>

              {/* People I Appreciate */}
              <div className="space-y-3">
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-normal text-purple-500 tracking-wide" style={{ fontFamily: displayFont }}>
                    People I Appreciate
                  </h3>
                </div>
                <ul className="space-y-2">
                  {entries[selectedDate].peopleAppreciate.map((item, index) => (
                    <li
                      key={`people-${index}`}
                      className={`p-3 bg-purple-50/60 rounded-xl border border-purple-100 font-light ${
                        !item && "text-gray-400 italic"
                      }`}
                      style={{ fontFamily: bodyFont }}
                    >
                      {index + 1}. {item || "No entry"}
                    </li>
                  ))}
                </ul>
              </div>

              {/* I've Got This! */}
              <div className="space-y-3">
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-normal text-blue-500 tracking-wide" style={{ fontFamily: displayFont }}>
                    I've Got This!
                  </h3>
                </div>
                <ul className="space-y-2">
                  {entries[selectedDate].toDoToday?.map((item, index) => (
                    <li
                      key={`todo-${index}`}
                      className={`p-3 bg-blue-50/60 rounded-xl border border-blue-100 font-light ${
                        !item && "text-gray-400 italic"
                      }`}
                      style={{ fontFamily: bodyFont }}
                    >
                      {index + 1}. {item || "No entry"}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
