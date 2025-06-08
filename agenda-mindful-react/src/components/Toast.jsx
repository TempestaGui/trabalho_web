import { useEffect, useState } from 'react';

export default function Toast({ message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`toast ${visible ? '' : 'hidden'}`}>
      <span>{message}</span>
    </div>
  );
}
