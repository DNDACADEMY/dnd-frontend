import { Txt } from '@dds/desktop'
import Image from 'next/image'

import * as styles from './style.css'
import { vars } from '../../../../styles/theme.css'

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
      <Txt
        as='span'
        typography='body1'
        className={styles.text}
        style={{ color: vars.colors.gray800 }}>
        {description}
      </Txt>
    </div>
  )
}
