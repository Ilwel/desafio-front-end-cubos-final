import './styles.css'
import profileLogo from '../../assets/profile.svg';
import ModalProfile from '../ModalProfile';
import { useState } from 'react';

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img onClick={() => setOpen(!open)} className="c-profile-icon" src={profileLogo} alt="profile-icon" />
      <ModalProfile
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}