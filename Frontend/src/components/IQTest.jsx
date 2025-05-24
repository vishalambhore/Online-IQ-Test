"use client"

import { useState, useEffect } from "react"
import { Clock, ChevronLeft, ChevronRight, CheckCircle, Eye, EyeOff, Trophy, User, Calendar, Timer } from "lucide-react"
import questions from "./questions"

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default function IQTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(""))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [testStarted, setTestStarted] = useState(false)
  const [userName, setUserName] = useState("")
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [timeLeft, setTimeLeft] = useState(1800)
  const [showAnswers, setShowAnswers] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [nameInput, setNameInput] = useState("")

  useEffect(() => {
    if (testStarted && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [testStarted, isSubmitted])

  const handleTimeUp = () => setShowNameModal(true)

  const handleStartTest = () => {
    setTestStarted(true)
    setStartTime(new Date())
  }

  const handleOptionSelect = (option) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = option
    setAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => setShowNameModal(true)

  const submitTest = () => {
    if (nameInput.trim()) {
      setUserName(nameInput)
      calculateScore()
      setShowNameModal(false)
    }
  }

  const calculateScore = () => {
    let calculatedScore = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        calculatedScore += 1
      }
    })
    setScore(calculatedScore)
    setEndTime(new Date())
    setIsSubmitted(true)
  }

  const jumpToQuestion = (index) => setCurrentQuestion(index)

  // Calculate progress percentage
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (progressPercentage < 33) return "bg-red-500"
    if (progressPercentage < 66) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Calculate how many questions are answered
  const answeredCount = answers.filter((answer) => answer !== "").length

  if (!testStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <div className="w-full max-w-md p-8 text-center space-y-6 bg-white/95 backdrop-blur shadow-xl rounded-xl">
          <h1 className="text-3xl font-bold text-gray-800">Tech Knowledge Quiz</h1>
          <p className="text-gray-600">Test your knowledge with 25 questions about technology and programming.</p>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Clock className="text-blue-500" size={20} />
              <span>Time Limit: 30 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              <span>25 Multiple Choice Questions</span>
            </div>
          </div>
          <button
            onClick={handleStartTest}
            className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all text-white rounded-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-2 px-6 rounded-full">
              Score: {score} / {questions.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="text-blue-500" />
                <span className="font-semibold">Name:</span> {userName}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="text-yellow-500" />
                <span className="font-semibold">Score:</span> {score} / {questions.length} (
                {Math.round((score / questions.length) * 100)}%)
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-green-500" />
                <span className="font-semibold">Start Time:</span> {startTime?.toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-2">
                <Timer className="text-red-500" />
                <span className="font-semibold">End Time:</span> {endTime?.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="mx-auto flex items-center gap-2 mb-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {showAnswers ? <EyeOff size={18} /> : <Eye size={18} />}
            {showAnswers ? "Hide Questions" : "View Questions"}
          </button>

          {showAnswers && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Question</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Your Answer</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Correct Answer</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q, index) => (
                    <tr key={q.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2">{q.question}</td>
                      <td className="border border-gray-300 px-4 py-2">{answers[index] || "Not Answered"}</td>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{q.answer}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {answers[index] === q.answer ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Correct
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Incorrect
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <br />
      <br />
      <br />
      <br />

      {/* Header with title and timer */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Tech Knowledge Quiz</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full">
              <Clock size={18} />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              <CheckCircle size={18} />
              <span>
                {answeredCount}/{questions.length} answered
              </span>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200">
          <div
            className={`h-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </header>

      {/* Main content - desktop layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Question panel - takes more space on desktop */}
        <div className="w-full lg:w-3/4 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  {currentQuestion + 1}
                </span>
                <h2 className="text-lg font-bold">Question</h2>
              </div>
              <b className="text-xl">
                <p>{questions[currentQuestion].question}</p>
              </b>
            </div>

            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border-2 ${
                    answers[currentQuestion] === option
                      ? "bg-blue-50 border-blue-500"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        answers[currentQuestion] === option ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                  currentQuestion === 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                <ChevronLeft size={18} /> Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 px-4 py-2 rounded-md"
                >
                  Submit <CheckCircle size={18} />
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 px-4 py-2 rounded-md"
                >
                  Next <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation panel - sidebar on desktop */}
        <div className="w-full lg:w-1/4 order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <div className="mb-4 border-b pb-2">
              <h3 className="font-bold text-lg">Questions</h3>
              <p className="text-sm text-gray-500">
                {answeredCount} of {questions.length} answered
              </p>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-4">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => jumpToQuestion(index)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                    ${
                      currentQuestion === index
                        ? "bg-blue-600 text-white"
                        : answers[index]
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t">
              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                Submit Quiz
              </button>

              <div>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md p-5 bg-white rounded-lg relative">
            <button
              onClick={() => setShowNameModal(false)}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="text-lg font-bold mb-3">Enter Your Name</h3>
            <p className="mb-3 text-sm">Please enter your name to submit the quiz:</p>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3"
              placeholder="Your Name"
            />
            <button
              onClick={submitTest}
              disabled={!nameInput.trim()}
              className={`px-4 py-2 rounded-md ${
                !nameInput.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

