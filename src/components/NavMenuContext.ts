/*
 * @FilePath: \e-learning-educational-case\src\components\NavMenuContext.ts
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-22 08:37:20
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-24 22:37:01
 */
import { useMediaQuery } from "@reactuses/core";
import { createContext, useState } from "react";

export const useNavMenuProviderValue = () => {
  const matches = useMediaQuery("(min-width: 750px)", false);
  const [show, setShow] = useState(false);
  const [maskStyle, setMaskStyle] = useState<Partial<DOMRect>>({});
  return {
    matches,
    show,
    setShow,
    maskStyle,
    setMaskStyle,
  };
};

export const NAvMenuContext = createContext<
  ReturnType<typeof useNavMenuProviderValue>
>({
  matches: false,
  show: false,
  setShow: () => {},
  maskStyle: {},
  setMaskStyle: () => {},
});
