export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>
        <nav>
          <h1>Certificate Generator</h1>
          <ul>
            <li>
              <a href="#">Generator</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>&copy; 2026 Certificate Generator. All rights reserved.</p>
      </footer>
    </div>
  )
}
