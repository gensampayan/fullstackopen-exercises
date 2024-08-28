import { test, expect, beforeEach, describe } from '@playwright/test'
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'test',
        username: 'username4',
        password: 'password1234'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await loginWith(page, 'username4', 'password1234')

    await expect(page.getByText('blogs')).toBeVisible()
  })

  
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'username4', 'password1234')

      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'username4', 'password1234')

      await expect(page.getByText('blogs')).not.toBeVisible()
    })
  })
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'username4', 'password1234')

      await expect(page.getByText('blogs')).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()
      await createBlog(page, 'new title', 'new author', 'http://www.google.com')

      await expect(page.getByText(`a new blog`)).toBeVisible()
    })

    test('test that makes sure the blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()
      await createBlog(page, 'new title', 'new author', 'http://www.google.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('test that ensures that the user who added the blog can delete the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()
      await createBlog(page, 'new title', 'new author', 'http://www.google.com');
      await page.getByRole('button', { name: 'remove' }).click();
      page.on('dialog', dialog => dialog.accept());

      await expect(page.getByText('http://www.google.com')).not.toBeVisible();
    });
    
    test(`test that ensures that only the user who added the blog sees the blog's delete button`, async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()
      await createBlog(page, 'new title', 'new author', 'http://www.google.com');

      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible();
    });

    test(`test that ensures that the blogs are arranged in the order according to the likes, the blog with the most likes first`, async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()
      const firstBlog = await createBlog(page, 'new title1', 'new author1', 'http://www.google.com');

      await page.waitForTimeout(500);
      await page.getByRole('button', { name: 'Create' }).click()
      const secondBlog = await createBlog(page, 'new title2', 'new author2', 'http://www.google.com');
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      const allBlogs = await page.getByTestId('blogs').all()

      await expect(allBlogs[0]).toHaveText('likes 1')
    });
  })
})