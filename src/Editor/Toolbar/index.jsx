import { useState, useEffect, useRef } from 'react'
import './index.css'

function ToolbarButton({ onClick, children }) {
  return (
    <div className="toolbarButton" onClick={onClick}>
      {children}
    </div>
  )
}

function DropdownOption({ onClick, children }) {
  return (
    <div tabIndex={0} className="dropdownOption" onClick={onClick}>
      {children}
    </div>
  )
}

export default function ToolBar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const [activeButton, setActiveButton] = useState(null)
  const dropdownRef = useRef(null)

  const handleClick = (e, buttonName) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    })
    setActiveButton(buttonName)
    setDropdownOpen(true)
  }

  useEffect(() => {
    const dropdownEl = dropdownRef.current
    if (!dropdownEl) return

    const handleFocusOut = () => {
      setTimeout(() => {
        if (!dropdownEl.contains(document.activeElement)) {
          setDropdownOpen(false)
          setActiveButton(null)
        }
      }, 0)
    }

    dropdownEl.addEventListener('focusout', handleFocusOut)
    return () => {
      dropdownEl.removeEventListener('focusout', handleFocusOut)
    }
  }, [isDropdownOpen])

  useEffect(() => {
    if (isDropdownOpen) {
      dropdownRef.current?.focus()
    }
  }, [isDropdownOpen])

  return (
    <div className="toolbar">
      <img src='assets/logo.svg' className='logo'></img>
      <ToolbarButton onClick={(e) => handleClick(e, 'file')}>File</ToolbarButton>
      <ToolbarButton onClick={(e) => handleClick(e, 'edit')}>Edit</ToolbarButton>

      {isDropdownOpen && (
        <div
          className="dropdown"
          ref={dropdownRef}
          tabIndex={-1}
          style={{
            outline: 'none',
            left: dropdownPosition.left,
            top: dropdownPosition.top,
          }}
        >
          {activeButton === 'file' && (
            <>
              <DropdownOption onClick={() => window.Blockly.serialization.workspaces.load({blocks: {languageVersion: 0, blocks: []}}, BlocklyWorkspace)}>New project</DropdownOption>
              <DropdownOption onClick={async() => {
                window.vm.loadProject(await window.vm.util.openFile('.bs'))
              }}>Load project</DropdownOption>
              <DropdownOption onClick={() => {
                if(window.confirm("WARNING: block-scape is still in development, we can't guarantee projects will load in the future! Would you like to continue?"))
                    window.vm.saveWorkspace()
                }}>Save as</DropdownOption>
            </>
          )}
          {activeButton === 'edit' && (
            <>
            </>
          )}
        </div>
      )}
    </div>
  )
}
