import type { ReactNode, UIEventHandler } from 'react';

import { useCollapsePresence } from '@/shared/hooks/useCollapsePresence';
import { cn } from '@/shared/lib/utils';

import {
  ItemsListInteractive,
  ItemsListInteractiveList,
} from './ItemsListInteractive';
import { ItemsListHeader } from './ItemsListHeader';
import { ListEmpty } from './ListEmpty';
import { ListError } from './ListError';
import { ListLoader } from './ListLoader';
import { itemsListShellClassName } from './itemsListLayout';

export type ItemsListLayout = 'fill' | 'fit';

/** `overlay` — карточка по центру тела; `footer` — компактный спиннер в конце списка */
export type ItemsListPendingLoaderPlacement = 'overlay' | 'footer';

export type ItemsListProps<T> = {
  isPending: boolean;
  isError: boolean;
  error: unknown;
  data: T[] | undefined;
  isFetching: boolean;
  title?: string;
  emptyMessage?: string;
  errorFallback?: string;
  /** Элемент справа в строке заголовка (например, кнопка действия). */
  headerEnd?: ReactNode;
  headerAddon?: ReactNode;
  className?: string;
  /** Доп. классы для `<ul>` (например, grid-колонки). */
  listClassName?: string;
  /** Скролл прокручиваемого `<ul>` (layout `fill`). */
  onListScroll?: UIEventHandler<HTMLUListElement>;
  /** `fill` — на всю высоту контейнера со скроллом; `fit` — по высоте элементов */
  layout?: ItemsListLayout;
  /** Содержимое `<ul>`: обычно набор `<li>…</li>` */
  children: (items: T[]) => ReactNode;
  /** Блок под списком (например, «Показать ещё»). */
  listFooter?: ReactNode;
  /** Клик по заголовку списка (`title`). */
  onTitleClick?: () => void;
  /** Только шапка: тело списка (скролл, пустое, ошибка) скрыто. */
  bodyCollapsed?: boolean;
  /** Анимация появления списка (для стабильных сеток лучше отключить). */
  listAnimateEnter?: boolean;
  /** Показывать карточку-лоадер в теле списка при `isPending`. */
  showPendingLoader?: boolean;
  /**
   * Где показывать лоадер при `isPending` / догрузке (`isFetching`).
   * По умолчанию: `footer` для `layout="fit"`, иначе `overlay`.
   */
  pendingLoaderPlacement?: ItemsListPendingLoaderPlacement;
  /** Показать тело списка при пустом `data` (напр. плитка «добавить»). */
  forceShowList?: boolean;
};

const listUlFillClassName =
  'coffer-scroll-list min-h-0 flex-1 list-none space-y-3 overflow-y-auto overscroll-y-contain [overflow-anchor:none] p-1.5';

const listUlFitClassName = 'list-none space-y-3 p-1';

export function ItemsList<T>({
  isPending,
  isError,
  error,
  data,
  isFetching,
  title,
  emptyMessage,
  errorFallback,
  headerEnd,
  headerAddon,
  className,
  listClassName,
  onListScroll,
  layout = 'fill',
  children,
  listFooter,
  onTitleClick,
  bodyCollapsed = false,
  listAnimateEnter = true,
  showPendingLoader = true,
  pendingLoaderPlacement,
  forceShowList = false,
}: ItemsListProps<T>) {
  const bodyPresence = useCollapsePresence(!bodyCollapsed, true);
  const bodyLayoutExpanded = !bodyCollapsed || bodyPresence.isMounted;
  const resolvedPendingLoaderPlacement =
    pendingLoaderPlacement ?? (layout === 'fit' ? 'footer' : 'overlay');

  const rootClassName = cn(
    'flex flex-col',
    bodyLayoutExpanded
      ? layout === 'fill'
        ? 'min-h-0 flex-1'
        : 'h-fit w-full max-h-full'
      : 'h-fit w-full shrink-0',
    className,
  );
  const listUlClassName =
    layout === 'fill' ? listUlFillClassName : listUlFitClassName;

  const items = data ?? [];
  const useFooterLoader = resolvedPendingLoaderPlacement === 'footer';
  const showOverlayLoader =
    isPending && showPendingLoader && !useFooterLoader;
  const showFooterPendingLoader =
    isPending && showPendingLoader && useFooterLoader;
  const showFooterFetchingLoader =
    isFetching && !isPending && useFooterLoader;
  const showError = !isPending && isError && data === undefined;
  const showEmpty =
    !isPending && !showError && items.length === 0 && !forceShowList;
  const showList =
    !showError &&
    (items.length > 0 || forceShowList) &&
    (!isPending || useFooterLoader);
  const showPendingFooterOnly =
    showFooterPendingLoader && items.length === 0 && !forceShowList;
  const showHeaderExtras = bodyPresence.isOpen;

  const footerLoaderNode =
    showFooterPendingLoader || showFooterFetchingLoader ? (
      <ListLoader variant="inline" />
    ) : null;

  const combinedListFooter =
    listFooter || footerLoaderNode ? (
      <>
        {listFooter}
        {footerLoaderNode}
      </>
    ) : null;

  const listBody = (
    <div
      className={cn(
        'relative flex min-h-0 flex-1 flex-col',
        itemsListShellClassName,
      )}
    >
      {showOverlayLoader ? (
            <div
              aria-hidden={!showOverlayLoader}
              className="coffer-list-fade flex min-h-0 flex-1 flex-col opacity-100"
            >
              <ItemsListInteractive className="flex min-h-0 flex-1 flex-col">
                <ListLoader />
              </ItemsListInteractive>
            </div>
          ) : null}

          <div
            className={cn(
              'coffer-list-fade flex min-h-0 flex-col gap-3',
              showOverlayLoader
                ? cn(
                    itemsListShellClassName,
                    'pointer-events-none absolute inset-0 opacity-0',
                  )
                : 'min-h-0 flex-1 opacity-100',
            )}
          >
            {showError ? (
              <ItemsListInteractive className="flex min-h-0 flex-1 flex-col p-1">
                <ListError error={error} fallbackMessage={errorFallback} />
              </ItemsListInteractive>
            ) : null}
            {showEmpty ? (
              <ItemsListInteractive className="flex min-h-0 flex-1 flex-col p-1">
                <ListEmpty message={emptyMessage} />
              </ItemsListInteractive>
            ) : null}
            {showList ? (
              <>
                <ItemsListInteractiveList
                  className={cn(
                    listUlClassName,
                    layout === 'fill' && 'p-1',
                    listAnimateEnter &&
                      'coffer-list-enter motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300',
                    listClassName,
                  )}
                  onScroll={onListScroll}
                >
                  {children(items)}
                </ItemsListInteractiveList>
                {combinedListFooter ? (
                  <ItemsListInteractive>{combinedListFooter}</ItemsListInteractive>
                ) : null}
              </>
            ) : null}
            {showPendingFooterOnly && footerLoaderNode ? (
              <ItemsListInteractive>{footerLoaderNode}</ItemsListInteractive>
            ) : null}
      </div>
    </div>
  );

  const listBodyNode = (
    <div
      className={cn(
        'coffer-collapse flex min-h-0 flex-col overflow-hidden',
        bodyPresence.isOpen
          ? layout === 'fill'
            ? 'min-h-0 flex-1 opacity-100'
            : 'opacity-100'
          : 'max-h-0 flex-none opacity-0',
      )}
      aria-hidden={!bodyPresence.isOpen}
    >
      {listBody}
    </div>
  );

  return (
    <div
      data-slot="items-list"
      className={cn(
        rootClassName,
        bodyPresence.isOpen ? 'gap-3' : 'gap-0',
        itemsListShellClassName,
      )}
      aria-busy={isPending}
    >
      <ItemsListHeader
        title={title}
        headerEnd={showHeaderExtras ? headerEnd : undefined}
        headerAddon={showHeaderExtras ? headerAddon : undefined}
        isFetching={
          showHeaderExtras ? isFetching && !useFooterLoader : false
        }
        isPending={isPending}
        onTitleClick={onTitleClick}
      />

      {bodyPresence.isMounted ? listBodyNode : null}
    </div>
  );
}
