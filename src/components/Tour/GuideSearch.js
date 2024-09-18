import React, { useState } from 'react';

const GuideSearch = ({ guides, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); // Local state for dropdown visibility

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true); // Show dropdown when typing
    };

    // Filter guides based on search term
    const filteredGuides = guides.filter((guide) =>
        guide.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle guide selection
    const handleGuideSelect = (guide) => {
        onSelect(guide.id); // Call the parent handler with the guide ID
        setShowDropdown(false); // Close dropdown after selecting
        setSearchTerm(guide.name); // Update the search field with the selected guide's name
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search tour guides"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
            {showDropdown && filteredGuides.length > 0 && (
                <ul className="absolute bg-white border rounded-lg w-full mt-1 max-h-40 overflow-y-auto z-50">
                    {filteredGuides.map((guide) => (
                        <li
                            key={guide.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleGuideSelect(guide)}
                        >
                            {guide.name} - {guide.experience_years} years of experience
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GuideSearch;
