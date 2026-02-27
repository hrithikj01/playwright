import { expect, Page } from "@playwright/test";


export default class HomePage{
    private readonly productSelector = "Products";
    constructor(private page:Page){}

    async validateHomePage(){
        await expect(this.page.getByText(this.productSelector)).toBeVisible({timeout:10000})
    }
}