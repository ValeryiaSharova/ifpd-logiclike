import classNames from 'classnames';
import React, { useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { AppIdea, AppIpVoice } from 'src/_generated';
import { actions } from 'src/actions';
import { Preloader } from 'src/components/atoms/Preloader';
import { Status } from 'src/components/atoms/Status';
import { Button } from 'src/components/molecules/Button';
import { Msg, msg } from 'src/i18n/Msg';

import styles from 'src/components/routes/pages/App/styles.module.css';

type Props = {};

export const App: React.FC<Props> = () => {
  const intl = useIntl();

  const [ideas, setIdeas] = useState<AppIdea[]>([]);
  const [ipVoices, setIpVoices] = useState<AppIpVoice['ideas_ids']>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadIdeas = async (showLoader = false, signal?: AbortSignal) => {
    if (showLoader) {
      setIsLoading(true);
    }

    try {
      const { list } = await actions.api['/app/ideas'].GET({
        Axios: { signal },
      });

      setIdeas(list);
    } finally {
      if (showLoader) {
        setIsLoading(false);
      }
    }
  };

  const handleVote = async (ideaId: number, index: number) => {
    const abortController = new AbortController();

    await actions.api['/app/ideas/:id'].PUT({
      Params: { id: String(ideaId) },
      Axios: { signal: abortController.signal },
    });

    actions.ui.toasts.add({
      message: msg(intl, {
        id: 'components.routes.pages.App.toast',
        values: { id: index },
      }),
      type: 'success',
    });

    setIpVoices((prev) => [...prev, ideaId]);

    await loadIdeas(false, abortController.signal);
  };

  useLayoutEffect(() => {
    const abortController = new AbortController();

    void loadIdeas(true, abortController.signal);

    void (async () => {
      const { item } = await actions.api['/app/ip-voices'].GET({
        Axios: { signal: abortController.signal },
      });

      setIpVoices(item.ideas_ids);
    })();

    return () => abortController.abort();
  }, []);

  if (isLoading) {
    return <Preloader fullScreen />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.description, 'body2')}>
        <Msg id="components.routes.pages.App.title" values={{ br: <br /> }} />
      </div>
      <ol className={styles.list}>
        {ideas.map((idea, index) => (
          <li key={idea.id} className="body3">
            <div className={styles.idea}>
              <span>{idea.name}</span>
              <div className={styles.innerBlock}>
                {!ipVoices.includes(idea.id) && (
                  <Button
                    color="primary"
                    htmlType="button"
                    title={{ id: 'components.routes.pages.App.button' }}
                    onClick={() => {
                      void handleVote(idea.id, index + 1);
                    }}
                  />
                )}
                <Status statusText={idea.count} variant="sky" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
