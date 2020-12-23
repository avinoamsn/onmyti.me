import { Link, routes } from '@redwoodjs/router'
import { Flash } from '@redwoodjs/web'

const EntriesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Flash timeout={1000} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.entries()} className="rw-link">
            Entries
          </Link>
        </h1>
        <Link to={routes.newEntry()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Entry
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default EntriesLayout
