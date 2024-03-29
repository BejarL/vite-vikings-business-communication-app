import { useState } from "react";
import EditMessage from "../modals/EditMessage";

const Dropdown = ({ deleteMsg, updateMsg, msgId, messageContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        id="dropdownMenu"
        data-dropdown-toggle="dropdownDotsHorizontal"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-200 bg-transparent hover:bg-gray-700 rounded"
        type="button"
        onClick={toggleDropdown}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownDotsHorizontal"
          className="absolute z-10 w-48 rounded-md shadow-lg mt-2 bg-white divide-y divide-gray-100  dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenu"
          >
            <li>
              <EditMessage
                msgId={msgId}
                messageContent={messageContent}
                updateMsg={updateMsg}
              />
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => deleteMsg(msgId)}
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
