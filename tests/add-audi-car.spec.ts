import { test, expect } from '@playwright/test';

// spec: specs/add-audi-car.md
// reference: tests/guest-garage.spec.ts

test.describe('Додавання Audi TT до Garage гостем', () => {
  test('Гість додає Audi TT з пробігом 12000', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Guest log in' }).click();
    await expect(page).toHaveURL(/panel\/garage/);
    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();

    // 1. Натиснути Add car.
    await page.getByRole('button', { name: 'Add car' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Add a car' })).toBeVisible();

    // 2. У полі Brand вибрати Audi.
    await page.getByLabel('Brand').selectOption({ label: 'Audi' });

    // 3. У полі Model вибрати TT.
    await page.getByLabel('Model').selectOption({ label: 'TT' });

    // 4. У полі Mileage ввести 12000.
    await page.getByRole('spinbutton', { name: 'Mileage' }).fill('12000');

    // 5. Підтвердити додавання автомобіля кнопкою Add.
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    // 6. Перевірити запис у Garage та пробіг, який відображає поточний UI.
    const audiTt = page.getByRole('listitem').filter({ hasText: 'Audi TT' });
    await expect(audiTt).toBeVisible();
    await expect(audiTt.getByRole('spinbutton')).toHaveValue('12000');
  });
});
