import { NextRequest, NextResponse } from "next/server";
import api from "./actions/api";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const userId = request.cookies.get('userId')?.value

  if (!userId) return NextResponse.redirect(new URL('/login', request.url))

    const res = await api(`/user/${userId}/main-data`, 'GET')
    const user: UserProps = await res.json()
    
    if (!user) return
    
    const enrollments = user.topicEnrollments

    let selectedTopicId = request.cookies.get('selectedTopicId')?.value
    let selectedTopic = selectedTopicId 
      ? enrollments.find(enrollment => enrollment.topic.id === selectedTopicId)?.topic
      : enrollments[enrollments.length - 1].topic

    if (!selectedTopic) {
      selectedTopic = enrollments[enrollments.length - 1].topic
    }

    response.cookies.set('selectedTopicId', selectedTopic.id)
    
    user.selectedTopic = {
      id: selectedTopic.id,
      color: selectedTopic.color
    }

    response.cookies.set('user', JSON.stringify(user))

    return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/lesson/:path*', '/challenges/:path*'],
}