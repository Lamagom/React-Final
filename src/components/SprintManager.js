import React, { useState, useCallback } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import "../App.css";

/**
 * 스프린트 관리 컴포넌트
 */
const SprintManager = React.memo(
  ({
    sprints,
    selectedSprintId,
    onSelectSprint,
    onAddSprint,
    onDeleteSprint,
  }) => {
    const [newSprintName, setNewSprintName] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const currentSprint = sprints.find((s) => s.id === selectedSprintId);

    const handleAdd = useCallback(
      (e) => {
        e.preventDefault();
        if (!newSprintName.trim()) return;
        onAddSprint(newSprintName.trim());
        setNewSprintName("");
        setIsFormOpen(false);
      },
      [newSprintName, onAddSprint]
    );

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* 드롭다운 */}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "var(--color-text-light)",
              backgroundColor: "rgba(31, 31, 31, 0.7)",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--color-border)",
              transition: "background-color 0.2s",
            }}
          >
            <span style={{ fontWeight: "bold", color: "var(--color-accent)" }}>
              {currentSprint?.name || "스프린트 선택"}
            </span>
            <ChevronDown
              size={16}
              style={{
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          </button>

          {isDropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: "0.5rem",
                width: "200px",
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                border: "1px solid var(--color-border)",
                borderRadius: "0.25rem",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.8)",
                zIndex: 30,
              }}
            >
              {sprints.map((sprint) => (
                <button
                  key={sprint.id}
                  onClick={() => {
                    onSelectSprint(sprint.id);
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.625rem 1rem",
                    fontSize: "0.875rem",
                    backgroundColor:
                      selectedSprintId === sprint.id ? "#333" : "transparent",
                    color:
                      selectedSprintId === sprint.id
                        ? "var(--color-accent)"
                        : "var(--color-text-light)",
                    borderLeft:
                      selectedSprintId === sprint.id
                        ? "4px solid var(--color-accent)"
                        : "none",
                    fontWeight:
                      selectedSprintId === sprint.id ? "bold" : "normal",
                    transition: "background-color 0.2s",
                  }}
                >
                  {sprint.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 스프린트 관리 사이드 메뉴 */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            style={{
              color: "var(--color-text-muted)",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              transition: "color 0.2s",
              backgroundColor: "rgba(31, 31, 31, 0.7)",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--color-border)",
            }}
          >
            <Plus size={14} />
            <span>스프린트 관리</span>
          </button>

          {isFormOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                marginTop: "0.5rem",
                zIndex: 30,
                width: "300px",
                backgroundColor: "#000",
                border: "1px solid #333",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.8)",
                padding: "1rem",
              }}
            >
              <h4
                style={{
                  color: "var(--color-text-white)",
                  fontWeight: "bold",
                  marginBottom: "0.75rem",
                  fontSize: "0.875rem",
                }}
              >
                새 스프린트 생성
              </h4>

              <form
                onSubmit={handleAdd}
                style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
              >
                <input
                  type="text"
                  value={newSprintName}
                  onChange={(e) => setNewSprintName(e.target.value)}
                  placeholder="스프린트의 이름을 입력하세요"
                  className="form-input"
                  style={{
                    flex: 1,
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.875rem",
                  }}
                  required
                />
                <button
                  type="submit"
                  className="form-submit-btn"
                  style={{
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.875rem",
                    boxShadow: "none",
                  }}
                >
                  추가
                </button>
              </form>

              <h4
                style={{
                  color: "var(--color-text-muted)",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  borderTop: "1px solid #333",
                  paddingTop: "0.75rem",
                }}
              >
                현재 스프린트 ({sprints.length})
              </h4>

              <div
                style={{
                  maxHeight: "128px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                }}
              >
                {sprints.map((sprint) => (
                  <div
                    key={sprint.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem",
                      borderRadius: "0.25rem",
                      backgroundColor:
                        selectedSprintId === sprint.id ? "#333" : "#222",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "0.875rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "60%",
                      }}
                    >
                      {sprint.name}
                    </span>

                    {sprint.id !== "sprint-1" && (
                      <button
                        onClick={() => onDeleteSprint(sprint.id)}
                        style={{ color: "#666", transition: "color 0.2s" }}
                        title="스프린트 삭제"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default SprintManager;
