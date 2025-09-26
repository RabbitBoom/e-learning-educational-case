/*
 * @FilePath: \e-learning-educational-case\__tests__\app\contact\page.test.tsx
 * @Author: chinamobao@gmali.com
 * @Date: 2025-09-26 18:43:42
 * @LastEditors: chinamobao@gmali.com
 * @LastEditTime: 2025-09-26 18:45:33
 */
import Contact from "@/app/contact/page";
import { render, screen } from '@testing-library/react';

describe("Contact Page",()=> {
    it("render Contact Page content",() => {
        render(<Contact />)
        expect(screen.getByText("Contact")).toBeInTheDocument()
    })
})