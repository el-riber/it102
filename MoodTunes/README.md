# MoodTunes - Music & Mood Matcher

**Student:** Elida  
**Course:** JavaScript Programming  
**Project:** Quarter Project of Choice Part III  
**Due Date:** December 14, 2025  

---

## 📋 Project Overview

MoodTunes is a web application that matches music to users' emotional states. Users select a mood (Happy, Sad, Chill, Energetic, Romantic, Motivated, Nostalgic, or Peaceful), and the app dynamically fetches matching songs from the iTunes API, providing 30-second audio previews with full playback controls.

---

## ✅ Code Requirements - All Met

### 1. **At Least One Function** ✅
The project contains **20+ functions**, including:
- `init()` - Initializes the application (line 95)
- `loadPlaylist()` - Fetches songs from iTunes API (line 382)
- `togglePlay()` - Controls audio playback (line 473)
- `addCustomMood()` - Creates custom moods with validation (line 240)
- `shufflePlaylist()` - Loads new random songs (line 566)

### 2. **Object Constructor** ✅
**Two object constructors implemented:**

**Mood Constructor (Lines 11-38):**
```javascript
function Mood(name, emoji, gradient, quotes, searchKeywords) {
    this.name = name;
    this.emoji = emoji;
    this.gradient = gradient;
    this.quotes = quotes;
    this.searchKeywords = searchKeywords;
    this.timesSelected = 0;
    
    this.getRandomQuote = function() { ... }
    this.getRandomKeyword = function() { ... }
    this.select = function() { ... }
}
```

**Song Constructor (Lines 42-56):**
```javascript
function Song(trackName, artistName, previewUrl, artworkUrl) {
    this.trackName = trackName;
    this.artistName = artistName;
    this.previewUrl = previewUrl;
    this.artworkUrl = artworkUrl;
    this.hasBeenPlayed = false;
    
    this.play = function() { ... }
}
```

### 3. **Array or Literal Object to Store Data** ✅
**appState Object (Lines 58-71):**
```javascript
const appState = {
    moods: [],              // Array storing Mood objects
    currentMood: null,
    currentPlaylist: [],    // Array storing Song objects
    currentAudio: null,
    currentSongIndex: null,
    statistics: {           // Literal object for stats
        moodCount: 0,
        songCount: 0,
        playCount: 0
    },
    customMoods: []        // Array for user-created moods
};
```

### 4. **Input Data Validation** ✅
**addCustomMood() Function (Lines 240-303)** includes comprehensive validation:

1. **Empty Check (Line 251-255):**
   ```javascript
   if (moodName === '') {
       this.showError('Please enter a mood name!');
       return;
   }
   ```

2. **Minimum Length (Line 257-261):**
   ```javascript
   if (moodName.length < 3) {
       this.showError('Mood name must be at least 3 characters!');
       return;
   }
   ```

3. **Maximum Length (Line 263-267):**
   ```javascript
   if (moodName.length > 20) {
       this.showError('Mood name must be less than 20 characters!');
       return;
   }
   ```

4. **Special Characters (Line 269-273):**
   ```javascript
   if (!/^[a-zA-Z\s]+$/.test(moodName)) {
       this.showError('Mood name can only contain letters!');
       return;
   }
   ```

5. **Duplicate Check (Line 275-283):**
   ```javascript
   const isDuplicate = appState.moods.some(mood => 
       mood.name.toLowerCase() === moodName
   );
   if (isDuplicate) {
       this.showError('This mood already exists!');
       return;
   }
   ```

---

## 🎯 Features

### Core Functionality
- **8 Predefined Moods:** Happy, Sad, Chill, Energetic, Romantic, Motivated, Nostalgic, Peaceful
- **Dynamic Music Discovery:** Searches iTunes API with mood-specific keywords
- **Custom Mood Creation:** Users can create their own moods with full validation
- **Audio Playback:** 30-second previews with play/pause, progress bar, volume control
- **Shuffle Feature:** Generates completely new playlists using different search keywords
- **Statistics Tracking:** Tracks moods explored, songs discovered, and tracks played
- **Data Persistence:** Uses localStorage to save statistics and custom moods

### Technical Implementation
- **API Integration:** iTunes Search API (https://itunes.apple.com/search)
- **Random Search Strategy:** Each mood has 6 search keywords; randomly selects one per search
- **Result Randomization:** Fetches 50 songs, shuffles them, displays 5 random selections
- **Error Handling:** Try-catch blocks for API failures with user-friendly error messages

---

## 📁 Project Structure

```
MoodTunes/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
└── script.js           # Complete JavaScript logic (690+ lines)
```

### File Descriptions

**index.html:**
- Semantic HTML5 structure
- Mood selector buttons
- Custom mood input section
- Playlist display area
- Statistics dashboard

**style.css:**
- Modern gradient backgrounds
- Responsive grid layouts
- Smooth animations and transitions
- Custom audio control styling
- Mobile-friendly design

**script.js:**
- Object-oriented architecture
- 8 default Mood objects created via constructor
- Dynamic Song object creation from API responses
- Complete audio playback system
- localStorage integration
- Comprehensive error handling

---

## 🚀 How to Run

1. **Open `index.html`** in any modern web browser (Chrome, Firefox, Safari, Edge)
2. **Click a mood button** (e.g., "Happy", "Energetic")
3. **Wait 2-3 seconds** for iTunes API to return results
4. **Click play button (▶)** on any song to hear 30-second preview
5. **Click shuffle button** to get completely different songs
6. **Create custom moods** using the input field at the bottom

**Note:** Internet connection required for iTunes API access.

---

## 🎨 How It Works

### Mood Selection Flow
1. User clicks mood button (e.g., "Energetic")
2. App randomly selects a keyword from mood's search terms:
   - `['workout', 'edm', 'high energy', 'rock', 'electronic dance', 'pump up']`
3. Searches iTunes API: `https://itunes.apple.com/search?term=workout&media=music&limit=50`
4. Receives ~50 song results
5. Filters for songs with 30-second preview URLs
6. Randomly shuffles the filtered results
7. Displays 5 random songs with album art, title, artist
8. User can play songs immediately

### Shuffle Mechanism
- Picks a **different random keyword** from the same mood
- Fetches a **completely new set of 50 songs**
- Provides **true variety** - not just reordering the same songs

### Custom Mood Example
User creates mood "Focused":
1. Types "Focused" into input field
2. Validation runs (length, characters, duplicates)
3. New Mood object created with default search keywords
4. Added to mood selector grid
5. Saved to localStorage for future sessions

---

## 📊 Code Statistics

- **Total Lines:** 690+
- **Functions:** 20+
- **Object Constructors:** 2
- **Data Structures:** 1 main object, 3 arrays
- **Validation Checks:** 5
- **API Calls:** Dynamic (1 per mood selection/shuffle)
- **Comments:** Extensive (JSDoc-style with explanations)

---

## 🎓 Learning Objectives Demonstrated

### JavaScript Concepts Applied
✅ Object-Oriented Programming (constructors, methods, properties)  
✅ Array manipulation (filter, map, sort, slice)  
✅ Asynchronous JavaScript (async/await, Promises, fetch API)  
✅ Event handling (click, timeupdate, ended)  
✅ DOM manipulation (createElement, innerHTML, classList)  
✅ Form validation (regex, length checks, duplicate detection)  
✅ Local storage (setItem, getItem, JSON parse/stringify)  
✅ Error handling (try-catch blocks)  
✅ Mathematical operations (random, floor, percentage calculations)  
✅ String manipulation (trim, toLowerCase, escapeHtml)  

### Problem-Solving Skills
- API integration with dynamic search parameters
- Preventing duplicate songs through randomization
- State management across user sessions
- Input sanitization and XSS prevention
- Graceful error handling for network failures

---

## 🔍 Code Quality Features

### Organization
- Clear section comments marking each major component
- Logical grouping of related functions
- Consistent naming conventions (camelCase)
- Separation of concerns (data, logic, presentation)

### Error Handling
- Try-catch blocks around all API calls
- User-friendly error messages displayed in UI
- Fallback behavior when API fails
- Validation feedback with auto-hiding messages

### Best Practices
- No global pollution (everything in `app` or `appState`)
- DRY principle (reusable utility functions)
- Comments explain "why" not just "what"
- Input sanitization prevents XSS attacks
- Responsive design works on all screen sizes

---

## 💡 Unique Implementation Choices

### Dynamic Search Strategy
Instead of hardcoding artist names or song titles, the app uses **genre/mood keywords** that search iTunes dynamically. This ensures:
- Infinite variety (iTunes has millions of songs)
- Fresh results every time
- No stale, outdated song lists
- True discovery experience

### Shuffle Innovation
The shuffle button doesn't just reorder existing songs - it performs a **completely new API search** with a different keyword, ensuring users never see the same songs twice (unless extremely unlucky with randomization).

### Smart Statistics
Statistics distinguish between:
- **Moods Explored:** Only counts manual clicks (not auto-loads)
- **Songs Discovered:** Total unique songs fetched from API
- **Tracks Played:** Only counts first play of each song

---

## 🎯 Testing Instructions

### Basic Functionality Test
1. Open application
2. Click each of the 8 default moods
3. Verify songs load for each mood
4. Play at least one song from each mood
5. Check statistics update correctly

### Validation Test
1. Try creating mood with empty name → Should show error
2. Try creating mood with 2 letters → Should show "minimum 3 characters" error
3. Try creating mood with 25 letters → Should show "maximum 20 characters" error
4. Try creating mood with numbers/symbols → Should show "letters only" error
5. Try creating duplicate mood → Should show "already exists" error
6. Create valid custom mood → Should succeed and auto-select

### Shuffle Test
1. Select "Happy" mood, note the songs
2. Click "Shuffle" button
3. Verify different songs appear
4. Click "Shuffle" again
5. Verify yet more different songs appear

### Persistence Test
1. Create a custom mood
2. Play some songs
3. Refresh the page
4. Verify statistics are preserved
5. Verify custom mood still exists

---

## 🌟 Extra Credit Features (Beyond Requirements)

- **Audio Progress Bar:** Clickable seek functionality
- **Volume Control:** Adjustable volume slider
- **Visual Feedback:** Active mood highlighting, button animations
- **Motivational Quotes:** Dynamic quotes that change with each mood
- **Gradient Backgrounds:** Smooth color transitions matching mood
- **Auto-Hide Messages:** Error/success messages disappear after 3 seconds
- **Album Artwork:** Visual album art for each song
- **Time Display:** Current time and duration for playing songs

---

## 📞 API Information

**iTunes Search API:**
- **Endpoint:** `https://itunes.apple.com/search`
- **No API Key Required:** Free, public API
- **Rate Limits:** None for educational use
- **Preview URLs:** 30-second DRM-free MP3 clips
- **Documentation:** https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/

**Sample Request:**
```
https://itunes.apple.com/search?term=happy+music&media=music&entity=song&limit=50
```

**Response Format:**
```json
{
  "resultCount": 50,
  "results": [
    {
      "trackName": "Happy",
      "artistName": "Pharrell Williams",
      "previewUrl": "https://audio-ssl.itunes.apple.com/...",
      "artworkUrl100": "https://is1-ssl.mzstatic.com/..."
    }
  ]
}
```



## 📝 Student Reflection

This project demonstrates mastery of:
- Object-oriented JavaScript programming
- RESTful API integration
- Asynchronous programming patterns
- DOM manipulation and event handling
- Form validation and user input sanitization
- Data persistence with localStorage
- Error handling and user experience design

The most challenging aspect was ensuring true song variety without hardcoding artist lists. The solution - using mood-based keywords with randomized API searches - creates an infinite discovery experience that feels fresh every time.

---

## 🎓 Conclusion

MoodTunes successfully combines all required JavaScript concepts into a functional, user-friendly application. The project goes beyond basic requirements by implementing professional features like audio controls, data persistence, and dynamic API integration. The code is well-organized, thoroughly commented, and demonstrates strong understanding of JavaScript fundamentals and best practices.

**Thank you for reviewing my project!**

---

*For any questions about the implementation, please refer to the inline comments in `script.js` or contact me.*
