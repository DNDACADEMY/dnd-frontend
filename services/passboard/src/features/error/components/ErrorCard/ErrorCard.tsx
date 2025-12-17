import Image from 'next/image'

import * as styles from './style.css'

type ErrorCardProps = {
  description: string
}

export const ErrorCard = ({ description }: ErrorCardProps) => {
  return (
    <div className={styles.container}>
      <Image
        src='/assets/images/shared/error-card.png'
        alt='error-card'
        width={340}
        height={386}
      />
      <span className={styles.text}>{description}</span>
    </div>
  )
}
