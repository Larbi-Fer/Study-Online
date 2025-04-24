'use client'

import { useEffect, useState } from "react"
import './style.css'
import { ArrowUpIcon, MessageSquareIcon, PlusIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppSelector } from "@/lib/hooks"
import { Tooltip } from "@mui/material"
import { getDiscussions, voteDiscussion } from "@/actions/community.actions"
import Button from "@/ui/Button"
import Loading from "@/ui/Loading"
import { formatDistanceToNowStrict } from "date-fns"

type DiscussionsProps = {
  defaultDisc: {
    discussions: DiscussionArgs[]
    total: number
    hasMore: boolean
  }
}

const Discussions = ({ defaultDisc }: DiscussionsProps) => {
  const [discussions, setDiscussions] = useState(defaultDisc.discussions)
  const [total, setTotal] = useState(defaultDisc.total)
  const [hasMore, setHasMore] = useState(defaultDisc.hasMore)
  const [page, setPage] = useState(0)
  const [sort, setSort] = useState<'vote' | 'newer'>('newer')
  const [loading, setLoading] = useState<'loadMore' | 'search' | undefined>()
  const userId = useAppSelector(state => state.user?.id)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setDiscussions(defaultDisc.discussions)
    setTotal(defaultDisc.total)
    setHasMore(defaultDisc.hasMore)
    setLoading(undefined)
  }, [defaultDisc])

  const goToDiscussion = (id: string) => {
    router.push(`/community/discussion/${id}`)
  }

  const vote = (discussionId: string) => async (e: React.FormEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    if (!userId) return

    try {
      const result = await voteDiscussion(discussionId, userId)
      if (result.message === 'SUCCESS') {
        setDiscussions(prev => prev.map(d =>
          d.id === discussionId ? {
            ...d,
            _count: {
              ...d._count,
              votes: d.votes.some(v => v.userId === userId)
                ? d._count.votes - 1
                : d._count.votes + 1
            },
            votes: d.votes.some(v => v.userId === userId)
              ? d.votes.filter(v => v.userId !== userId)
              : [...d.votes, { userId }]
          } : d
        ))
      }
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  const searchByTag = (tag: string) => (e: React.FormEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    setLoading('search')
    router.push('?tag=' + tag)
  }

  const searchByFilter = (sort: 'vote' | 'newer') => async (e: React.FormEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    setSort(sort)
    setPage(0)
    setLoading('search')
    const result = await getDiscussions(userId, { orderBy: sort })
    setDiscussions(result.payload.discussions)
    setTotal(result.payload.total)
    setHasMore(result.payload.hasMore)
    setLoading(undefined)
  }

  const loadMore = async () => {
    setLoading('loadMore')
    const tag = searchParams.get('tag')
    const q = searchParams.get('q')
    const result = await getDiscussions(userId, { orderBy: sort, skip: page + 1, tag: tag || undefined, q: q || undefined })
    setDiscussions(prev => [...prev, ...result.payload.discussions])
    setPage(prev => prev + 1)
    setTotal(result.payload.total)
    setHasMore(result.payload.hasMore)
    setLoading(undefined)
  }

  return (
    <div className="discussions">
      <div className="header">
        <div>
          <Tooltip title="Create a new discussion">
            <Button onClick={() => router.push('/community/discussion/create')}>
              <PlusIcon size={18} />
            </Button>
          </Tooltip>
        </div>
        <div className="filter-options">
          <h3>Sort by: </h3>
          <div className={"filter-option" + (sort === 'vote' ? ' selected' : '')} onClick={searchByFilter('vote')}>vote</div>
          <div className={"filter-option" + (sort === 'newer' ? ' selected' : '')} onClick={searchByFilter('newer')}>newer</div>
        </div>
      </div>

      {loading === 'search' ? <div style={{position: 'relative', height: '500px', width: '100%'}}>
        <Loading />
      </div> : 
      <div className="list">
        {discussions.map(discussion => (
          <div key={discussion.id} className="discussion" onClick={() => goToDiscussion(discussion.id)}>
            <div>
              <div className="discussion-header">
                <Tooltip title={userId ? 'vote' : 'You must be logged in'}>
                  <span
                    className={"vote-count" + (discussion.votes.length ? ' voted' : '')}
                    onClick={vote(discussion.id)}
                    style={{ cursor: userId ? 'pointer' : 'default' }}
                  >
                    <div className="vote-icon">
                      <ArrowUpIcon />
                      <ArrowUpIcon color={discussion.votes.some(v => v.userId === userId) ? "#007bff" : undefined} />
                    </div>
                    {discussion._count.votes}
                  </span>
                </Tooltip>
                <h4>{discussion.title}</h4>
                <span className="user">@{discussion.user.fullname || discussion.user.email.split('@')[0]}</span>
              </div>
              <div className="discussion-meta">
                <span>
                  {formatDistanceToNowStrict(discussion.createdAt, { addSuffix: true })}
                </span>
                <span className="comment-count">
                  <MessageSquareIcon /> {discussion._count.comments}
                </span>
              </div>
            </div>

            <div className="discussion-tags-list">
              {discussion.tags.map(tag => (
                <span key={tag} className="tag" onClick={searchByTag(tag)}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
        {hasMore &&
        <div className="load-more">
          <Button onClick={loadMore} loading={loading === 'loadMore'}>Load more</Button>
        </div>}
      </div>
      }
    </div>
  )
}

export default Discussions
