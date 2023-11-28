// src/index.ts

import puppeteer from 'puppeteer';

async function main() {
    console.log('here we go');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {

        await page.goto('https://trello.com/b/QvHVksDa/personal-work-goals');
        const tasks = await page.$$eval('.T9JQSaXUsHTEzk', (tasks) => 
            tasks.map((task) => task.textContent)
         );
      
        await page.goto('https://app.todoist.com/auth/login');
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        await page.type('#element-0', 'luisportugall@hotmail.com');
        await page.type('#element-3', 'PracticaNode2023');
        await page.click('button[type="submit"]');
        
        await page.waitForSelector('.view_content', { visible: true });
      
        //await page.click('.plus_add_button');
        // const tasksToAdd = tasks.slice(0, 5);
        for (const task of tasks) {
            const addButton = await page.$('.plus_add_button');
            await addButton.click();
           
            await page.waitForSelector('task_editor__editing_area', { visible: true });

            await page.type('.task_editor p', 'Lo que sea');
            await page.keyboard.press('Enter');
            await page.waitForTimeout(1000); // Esperar un segundo entre tareas
        }

    } catch ( error ) {
        console.log(error);
    }
    await browser.close();
}

main();
