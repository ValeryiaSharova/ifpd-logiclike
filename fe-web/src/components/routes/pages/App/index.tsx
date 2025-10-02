import { useUnit } from 'effector-react';
import React from 'react';

import { Status } from 'src/components/atoms/Status';
import { Button } from 'src/components/molecules/Button';
import { Msg } from 'src/i18n/Msg';
import { $ideas } from 'src/store/access';

import styles from 'src/components/routes/pages/App/styles.module.css';

type Props = {};

export const App: React.FC<Props> = () => {
  const ideas = useUnit($ideas);

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <Msg id="components.routes.pages.App.title" values={{ br: <br /> }} />
      </div>
      <ol className={styles.list}>
        {ideas.map((idea) => (
          <li key={idea.id}>
            <div className={styles.idea}>
              <span>{idea.name}</span>
              <div className={styles.innerBlock}>
                <Status statusText={idea.count} variant="sky" />
                <Button
                  color="primary"
                  htmlType="button"
                  title={{ id: 'components.routes.pages.App.button' }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
