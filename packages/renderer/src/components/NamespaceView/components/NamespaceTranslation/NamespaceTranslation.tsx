import TranslationEditor from '@/components/NamespaceView/components/NamespaceTranslation/components/TranslationEditor';
import TranslationList from '@/components/NamespaceView/components/NamespaceTranslation/components/TranslationList';
import { NAMESPACE_TOOLBAR_HEIGHT } from '@/components/NamespaceView/constants';
import { useNamespaceFilteredTranslations } from '@/components/NamespaceView/hooks';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function NamespaceTranslation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    const resizeObserver = new ResizeObserver(updateHeight);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const { translations, keyword } = useNamespaceFilteredTranslations();

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: `calc(100% - ${NAMESPACE_TOOLBAR_HEIGHT + 16}px)`,
        maxHeight: `calc(100% - ${NAMESPACE_TOOLBAR_HEIGHT + 16}px)`,
        display: 'flex',
      }}
    >
      <TranslationList height={containerHeight} translations={translations} keyword={keyword} />
      <TranslationEditor translations={translations} />
    </Box>
  );
}

export default NamespaceTranslation;
