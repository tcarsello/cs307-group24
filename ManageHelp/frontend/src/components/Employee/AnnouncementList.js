import { useState } from 'react'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from 'react'
import AnnouncmentDetails from './AnnouncementDetails'

export default function AnnouncementList({ wid }) {
  const [ announcements, setAnnouncements ] = useState('')
  const { user } = useAuthContext()
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch('/api/workspaces/announce/' + wid, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      setAnnouncements(json)
    }

    if (user) {
      fetchAnnouncements()
    }
  }, [wid, user, setAnnouncements])

  return (
    <div>
      <div className="announcements">
        {announcements && announcements.map(announce => (
          <AnnouncmentDetails creatorName={announce.creatorName}
          date={announce.createdAt}
          text={announce.text}
          key={announce.status} />
        ))}
      </div>
    </div>
  );
}