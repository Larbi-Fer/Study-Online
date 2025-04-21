
const DiscussionPage = async({params}: {params: Promise<{id: string}>}) => {
  const discId = (await params).id

  return (
    <div>
      Hello, {discId}
    </div>
  )
}

export default DiscussionPage
