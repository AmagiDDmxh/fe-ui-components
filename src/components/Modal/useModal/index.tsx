import React from "react";
import type { ConfirmDialogProps } from "../ConfirmDialog";
import usePatchElement from "./usePatchElement";
import HookModal, { HookModalRef } from "./HookModal";
import {
  withConfirm,
  ModalStaticFunctions,
  withInfo,
  withSuccess,
  withError,
  withWarn,
} from "../confirm";

let uuid = 0;

interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1];
}

const ElementsHolder = React.memo(
  React.forwardRef<ElementsHolderRef>((_props, ref) => {
    const [elements, patchElement] = usePatchElement();
    React.useImperativeHandle(
      ref,
      () => ({
        patchElement,
      }),
      []
    );
    return <>{elements}</>;
  })
);

export default function useModal(): [
  Omit<ModalStaticFunctions, "warn">,
  React.ReactElement
] {
  const holderRef = React.useRef<ElementsHolderRef>(null as any);

  // ========================== Effect ==========================
  const [actionQueue, setActionQueue] = React.useState<(() => void)[]>([]);

  React.useEffect(() => {
    if (actionQueue.length) {
      const cloneQueue = [...actionQueue];
      cloneQueue.forEach((action) => {
        action();
      });

      setActionQueue([]);
    }
  }, [actionQueue]);

  // =========================== Hook ===========================
  const getConfirmFunc = React.useCallback(
    (withFunc: (config: ConfirmDialogProps) => ConfirmDialogProps) =>
      function hookConfirm(config: ConfirmDialogProps) {
        uuid += 1;

        const modalRef = React.createRef<HookModalRef>();

        let closeFunc: Function;
        const modal = (
          <HookModal
            key={`modal-${uuid}`}
            config={withFunc(config)}
            ref={modalRef}
            afterClose={() => {
              closeFunc();
            }}
          />
        );

        closeFunc = holderRef.current?.patchElement(modal);

        return {
          destroy: () => {
            function destroyAction() {
              modalRef.current?.destroy();
            }

            if (modalRef.current) {
              destroyAction();
            } else {
              setActionQueue((prev) => [...prev, destroyAction]);
            }
          },
          update: (newConfig: ConfirmDialogProps) => {
            function updateAction() {
              modalRef.current?.update(newConfig);
            }

            if (modalRef.current) {
              updateAction();
            } else {
              setActionQueue((prev) => [...prev, updateAction]);
            }
          },
        };
      },
    []
  );

  const fns = React.useMemo(
    () => ({
      info: getConfirmFunc(withInfo),
      success: getConfirmFunc(withSuccess),
      error: getConfirmFunc(withError),
      warning: getConfirmFunc(withWarn),
      confirm: getConfirmFunc(withConfirm),
    }),
    [getConfirmFunc]
  );

  return [fns, <ElementsHolder ref={holderRef} />];
}