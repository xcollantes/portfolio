/** Utility functions for fetching and processing GitHub gists. */

export interface GistFile {
  /** Filename of the gist file. */
  filename: string
  /** Programming language of the file. */
  language: string | null
  /** Raw content of the file. */
  content: string
  /** Size of the file in bytes. */
  size: number
  /** Whether the file is truncated. */
  truncated: boolean
  /** Type of the file (usually 'text/plain' or similar). */
  type: string
}

export interface GistData {
  /** Unique gist ID. */
  id: string
  /** Description of the gist. */
  description: string | null
  /** Whether the gist is public or private. */
  public: boolean
  /** Owner information. */
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  /** Files in the gist. */
  files: { [filename: string]: GistFile }
  /** URL to the gist on GitHub. */
  html_url: string
  /** Creation date. */
  created_at: string
  /** Last updated date. */
  updated_at: string
  /** Git pull URL. */
  git_pull_url: string
  /** Git push URL. */
  git_push_url: string
  /** Clone URL via HTTPS. */
  clone_url: string
}

/**
 * Extract gist ID from various GitHub gist URL formats.
 *
 * Supported formats:
 * - https://gist.github.com/username/gist_id
 * - https://gist.github.com/gist_id
 * - gist_id (just the ID)
 */
export function extractGistId(gistUrl: string): string | null {
  // If it's already just an ID (alphanumeric string)
  if (/^[a-f0-9]+$/i.test(gistUrl.trim())) {
    return gistUrl.trim()
  }

  // Extract from various URL formats
  const patterns = [
    /gist\.github\.com\/[^\/]+\/([a-f0-9]+)/i, // https://gist.github.com/username/gist_id
    /gist\.github\.com\/([a-f0-9]+)/i,         // https://gist.github.com/gist_id
  ]

  for (const pattern of patterns) {
    const match = gistUrl.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Fetch gist data from GitHub API.
 *
 * @param gistId - The gist ID or URL
 * @returns Promise resolving to gist data or null if error
 */
export async function fetchGistData(gistId: string): Promise<GistData | null> {
  try {
    const id = extractGistId(gistId)
    if (!id) {
      console.error('Invalid gist ID or URL:', gistId)
      return null
    }

    const response = await fetch(`https://api.github.com/gists/${id}`)

    if (!response.ok) {
      console.error('Failed to fetch gist:', response.status, response.statusText)
      return null
    }

    const gistData: GistData = await response.json()
    return gistData
  } catch (error) {
    console.error('Error fetching gist:', error)
    return null
  }
}

/**
 * Get the primary file from a gist.
 * Returns the first file if no specific file is preferred.
 */
export function getPrimaryGistFile(gistData: GistData): GistFile | null {
  const files = Object.values(gistData.files)
  if (files.length === 0) return null

  // Prefer files with specific extensions in this order
  const preferredExtensions = ['.md', '.js', '.ts', '.py', '.jsx', '.tsx']

  for (const ext of preferredExtensions) {
    const file = files.find(f => f.filename.toLowerCase().endsWith(ext))
    if (file) return file
  }

  // If no preferred file found, return the first one
  return files[0]
}

/**
 * Get language from filename extension.
 * This helps when GitHub API doesn't provide language info.
 */
export function getLanguageFromFilename(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase()

  const languageMap: { [key: string]: string } = {
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'py': 'python',
    'rb': 'ruby',
    'go': 'go',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cxx': 'cpp',
    'cc': 'cpp',
    'h': 'c',
    'hpp': 'cpp',
    'cs': 'csharp',
    'php': 'php',
    'sh': 'bash',
    'bash': 'bash',
    'zsh': 'bash',
    'fish': 'bash',
    'ps1': 'powershell',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    'ini': 'ini',
    'cfg': 'ini',
    'conf': 'ini',
    'md': 'markdown',
    'markdown': 'markdown',
    'txt': 'text',
    'sql': 'sql',
    'r': 'r',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'clj': 'clojure',
    'elm': 'elm',
    'ex': 'elixir',
    'exs': 'elixir',
    'fs': 'fsharp',
    'hs': 'haskell',
    'lua': 'lua',
    'pl': 'perl',
    'rs': 'rust',
    'vim': 'vim',
    'dockerfile': 'dockerfile',
  }

  return languageMap[extension || ''] || 'text'
}