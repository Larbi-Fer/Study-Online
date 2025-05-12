import Image from 'next/image';
import './style.css'
import ProfileDiscussions from './ProfileDiscussions';

const Profile = ({profile}: {profile: ProfileArgs}) => {
  console.log(profile);
  
  return (
    <div className="profile-container">
      <div className="info">
        <div className="profile-header">
          <div className="profile-icon">
            <img src={profile.icon.path} alt="Profile Icon" />
          </div>
          <div className="profile-info">
            <h1 className="fullname">{profile.fullname}</h1>
            <p className="email">{profile.email}</p>
          </div>
        </div>

        {profile.role == 'code_reviewer' ? 
          <div>Reviewer</div>
        :
          <div className="completed-topics">
            <h2>Completed Topics</h2>
            <div className="topics-list">
              {profile.topicEnrollments.map(({topic}, index) => (
                <div className="topic-item" key={index}>
                  <Image alt='icon' src={topic.icon.path} width={20} height={20} />
                  <span className="topic-title">{topic.title}</span>
                </div>
              ))}
            </div>
          </div>
        }
      </div>

      <div className="discussions" style={{width: '100%'}}>
        <h2>Recent Discussions</h2>
        <div className="discussion-list">
          <ProfileDiscussions discussions={profile.discussions} />
        </div>
      </div>
    </div>
  )
}

export default Profile
