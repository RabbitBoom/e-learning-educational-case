/*
 * @FilePath: \e-learning-educational-case\src\components\NavMenuContext.ts
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-22 08:37:20
 * @LastEditors: chinamobao@gmail.com
 * @LastEditTime: 2025-09-25 13:32:38
 */
import { useMediaQuery } from "@reactuses/core";
import { useAnimation } from "motion/react";
import { createContext, useState } from "react";

export const useNavMenuProviderValue = () => {
  const menuControls = useAnimation();
  const navWrapControls = useAnimation();
  const [show, setShow] = useState(false);
  const matches = useMediaQuery("(min-width: 750px)", false);
  const [maskStyle, setMaskStyle] = useState<Partial<DOMRect>>({});

  const openMethod = () => {
    if (matches) return;
    setShow(true);
    if (document) {
      document.body.classList.add("overflow-hidden");
    }
    menuControls.set({ translateX: "0", translateY: "-100%" });
    navWrapControls.set({ translateX: "-100%" });

    menuControls.start({
      translateY: "0%",
      transition: { duration: 0.1 },
    });
    navWrapControls.start({
      translateX: "0%",
      transition: { duration: 0.3, delay: 0.1 },
    });
  };

  const closeMethod = async () => {
    if (matches) return;
    await navWrapControls.start({
      translateX: "-100%",
      transition: { duration: 0.3 },
    });
    await menuControls.start({
      translateY: "-100%",
      transition: { duration: 0.1 },
    });
    if (document) {
      document.body.classList.remove("overflow-hidden");
    }
    setShow(false);
  };

  return {
    matches,
    show,
    setShow,
    maskStyle,
    setMaskStyle,
    menuControls,
    navWrapControls,
    openMethod,
    closeMethod,
  };
};

export const NAvMenuContext = createContext<
  Partial<ReturnType<typeof useNavMenuProviderValue>>
>({});
