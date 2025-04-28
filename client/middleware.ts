import { NextRequest, NextResponse } from "next/server";
import api from "./actions/api";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const userId = request.cookies.get('userId')?.value
  console.log('open');
  

  if (!userId) {
    if (request.nextUrl.pathname.startsWith('/topics') || request.nextUrl.pathname.startsWith('/community')) return;
    return NextResponse.redirect(new URL('/login', request.url))
  }

    const res = await api(`/user/${userId}/main-data`, 'GET')
    const user: UserProps = await res.json()
    
    if (!user) return

    if (user.role !== 'student') {
      response.cookies.set('user', JSON.stringify(user))
      return response
    }

    const enrollments = user.topicEnrollments

    let selectedTopicId = request.cookies.get('selectedTopicId')?.value
    let selectedTopic = selectedTopicId 
      ? enrollments.find(enrollment => enrollment.topic.id === selectedTopicId)
      : enrollments[enrollments.length - 1]

    if (!selectedTopic) {
      selectedTopic = enrollments[enrollments.length - 1]
    }

    response.cookies.set('selectedTopicId', selectedTopic.topic.id)
    
    user.selectedTopic = {
      id: selectedTopic.topic.id,
      color: selectedTopic.topic.color,
      currentLesson: selectedTopic.currentLesson,
      level: selectedTopic.level
    }

    response.cookies.set('user', JSON.stringify(user))

    return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/lessons/:path*', '/challenges/:path*', '/quiz/:path*', '/reviews/:path*', '/topics/:path*', '/community/:path*'],
}