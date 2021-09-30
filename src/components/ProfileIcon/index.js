import './styles.css'
import profileLogo from '../../assets/profile.svg';
import ModalProfile from '../ModalProfile';
import { useState } from 'react';

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);

  function handleClickProfile() {
    setOpen(!open);
  }

  return (
    <>
      <img onClick={handleClickProfile} className="c-profile-icon" src={profileLogo} alt="profile-icon" />
      <ModalProfile
        open={open}
      />
    </>
  )
}