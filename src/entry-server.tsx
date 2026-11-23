import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './App.tsx'
import { CompareProvider } from './context/CompareContext.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { contentPath, localePath } from './lib/locale.ts'
import { absoluteUrl } from './seo/site.ts'
import { prerenderPaths } from './seo/topics.ts'

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <LanguageProvider>
          <CompareProvider>
            <AppRoutes />
          </CompareProvider>
        </LanguageProvider>
      </MemoryRouter>
    </StrictMode>,
  )
  return new Response(prelude).text()
}

export { absoluteUrl, contentPath, localePath, prerenderPaths }
