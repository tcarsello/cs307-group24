import React, { useState } from 'react';
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from 'react'
import AnnouncmentDetails from './AnnouncementDetails'

export default function AnnouncementList( { wid } ) {
  console.log("announcementlist wid: " + wid)
  const { user } = useAuthContext()
  const { announcements, setAnnouncements} = useState(null)
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch('/api/workspaces/' + wid, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setAnnouncements(json)
      }
    }

    if (user) {
      fetchAnnouncements()
    }
  }, [ user, wid, setAnnouncements])

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