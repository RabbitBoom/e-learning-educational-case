/*
 * @FilePath: \e-learning-educational-case\__mocks__\motion\react.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-27 13:14:47
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-27 20:36:47
 */
export const useAnimation = () => ({
  set: jest.fn(),
  start: jest.fn(() => Promise.resolve()),
});

export const motion = {
  div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} data-testid="motion-div">{children}</div>
  ),
};

