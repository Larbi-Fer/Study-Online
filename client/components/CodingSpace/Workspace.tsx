
type WorkspaceProps = {
  children: React.ReactNode
  header: React.ReactNode
}

const Workspace = ({ children, header }: WorkspaceProps) => {
  return (
    <div className="editor-workspace">
      <div className="panel-header">
        {header}
      </div>
      <div className='panel-content'>
        {children}
      </div>
    </div>
  )
}

export default Workspace