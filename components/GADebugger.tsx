/**
 * Google Analytics Debugger Component
 * 
 * Use this component to test and debug GA4 tracking in development.
 * Add it temporarily to any page to see if events are being sent.
 */

import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useState } from "react"

export function GADebugger() {
  const [logs, setLogs] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)])
  }

  useEffect(() => {
    // Test if GA is loaded
    if (typeof window !== 'undefined') {
      addLog('GADebugger: Component mounted')
      
      // Check if gtag is available
      if (typeof window.gtag !== 'undefined') {
        addLog('✅ gtag is available')
      } else {
        addLog('❌ gtag is NOT available')
      }

      // Check if GA script is loaded
      const gaScripts = document.querySelectorAll('script[src*="googletagmanager"]')
      if (gaScripts.length > 0) {
        addLog(`✅ Found ${gaScripts.length} GA script(s) loaded`)
      } else {
        addLog('❌ No GA scripts found in document')
      }
    }
  }, [])

  const testEvents = [
    {
      name: "Test Page View",
      action: () => {
        sendGAEvent("page_view", {
          page_path: "/debug-test",
          page_title: "Debug Test Page",
          page_location: window.location.href,
        })
        addLog('📊 Sent: page_view event')
      }
    },
    {
      name: "Test Custom Event",
      action: () => {
        sendGAEvent("debug_test", {
          test_parameter: "debug_value",
          timestamp: Date.now()
        })
        addLog('🧪 Sent: debug_test event')
      }
    },
    {
      name: "Test Standard Event",
      action: () => {
        sendGAEvent("select_content", {
          content_type: "debug",
          content_id: "debug_button"
        })
        addLog('🎯 Sent: select_content event (standard GA4)')
      }
    }
  ]

  if (!isVisible) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 9999,
        backgroundColor: '#007acc',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: '12px'
      }} onClick={() => setIsVisible(true)}>
        🔍 GA Debug
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '350px',
      maxHeight: '500px',
      backgroundColor: '#1e1e1e',
      color: '#ffffff',
      border: '2px solid #007acc',
      borderRadius: '8px',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '11px',
      overflow: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#007acc',
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <strong>🔍 GA4 Debugger</strong>
        <button 
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{ padding: '12px' }}>
        <div style={{ marginBottom: '12px' }}>
          <strong>Test Events:</strong>
        </div>
        {testEvents.map((event, index) => (
          <button
            key={index}
            onClick={event.action}
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '6px',
              padding: '6px 8px',
              backgroundColor: '#333',
              color: '#fff',
              border: '1px solid #555',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            {event.name}
          </button>
        ))}
        
        <div style={{ marginTop: '12px', marginBottom: '8px' }}>
          <strong>Event Log:</strong>
        </div>
        
        <div style={{
          backgroundColor: '#000',
          padding: '8px',
          borderRadius: '3px',
          maxHeight: '200px',
          overflowY: 'auto',
          border: '1px solid #333'
        }}>
          {logs.length === 0 ? (
            <div style={{ color: '#666' }}>No events logged yet...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '2px' }}>
                {log}
              </div>
            ))
          )}
        </div>
        
        <div style={{ 
          marginTop: '8px', 
          fontSize: '10px', 
          color: '#888',
          borderTop: '1px solid #333',
          paddingTop: '8px'
        }}>
          📝 Check Network tab for gtag requests<br/>
          🔄 Check GA4 Real-time reports<br/>
          🎯 GA ID: G-HB7D403D67
        </div>
      </div>
    </div>
  )
}