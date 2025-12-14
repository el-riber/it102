// ============================================
// CLASS REQUIREMENT 1: OBJECT CONSTRUCTOR
// ============================================

/**
 * Mood Object Constructor
 * Creates mood objects with properties and methods
 */
function Mood(name, emoji, gradient, quotes, searchKeywords) {
    this.name = name;
    this.emoji = emoji;
    this.gradient = gradient;
    this.quotes = quotes;
    this.searchKeywords = searchKeywords;  // Array of search terms for iTunes
    this.timesSelected = 0;
    
    // Method to get a random quote
    this.getRandomQuote = function() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        return this.quotes[randomIndex];
    };
    
    // Method to get a random search keyword
    this.getRandomKeyword = function() {
        const randomIndex = Math.floor(Math.random() * this.searchKeywords.length);
        return this.searchKeywords[randomIndex];
    };
    
    // Method to increment selection count
    this.select = function() {
        this.timesSelected++;
    };
}

/**
 * Song Object Constructor
 * Creates song objects from API data
 */
function Song(trackName, artistName, previewUrl, artworkUrl) {
    this.trackName = trackName;
    this.artistName = artistName;
    this.previewUrl = previewUrl;
    this.artworkUrl = artworkUrl;
    this.hasBeenPlayed = false;
    
    // Method to mark song as played
    this.play = function() {
        this.hasBeenPlayed = true;
    };
}

// ============================================
// CLASS REQUIREMENT 2: ARRAY/LITERAL OBJECT TO STORE DATA
// ============================================

/**
 * Application State Object
 * Stores all app data using objects and arrays
 */
const appState = {
    moods: [],  // Array to store all mood objects
    currentMood: null,
    currentPlaylist: [],  // Array to store current song objects
    currentAudio: null,
    currentSongIndex: null,
    statistics: {
        moodCount: 0,
        songCount: 0,
        playCount: 0
    },
    customMoods: []  // Array to store user-created moods
};

// ============================================
// MAIN APPLICATION OBJECT
// ============================================

const app = {
    /**
     * CLASS REQUIREMENT 3: FUNCTION
     * Initialize the application
     */
    init: function() {
        this.createDefaultMoods();
        this.loadFromLocalStorage();
        this.renderMoodButtons();
        this.updateStatistics();
    },

    /**
     * Create default mood objects using constructor
     * Each mood has search keywords that will be used to find songs on iTunes
     */
    createDefaultMoods: function() {
        appState.moods = [
            new Mood(
                'happy',
                '😄',
                'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                [
                    "Happiness is not by chance, but by choice. 🌟",
                    "Keep smiling, because life is beautiful! 😊",
                    "Today is a great day to be happy! ✨",
                    "Joy is the simplest form of gratitude. 💛"
                ],
                ['upbeat pop', 'feel good', 'party music', 'dance pop', 'summer hits', 'celebration']
            ),
            new Mood(
                'sad',
                '😢',
                'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                [
                    "It's okay to not be okay. Let the music heal. 💙",
                    "Sometimes the heart sees what's invisible to the eye. 🌧️",
                    "Tears are words the heart can't express. 💫",
                    "Every storm runs out of rain. 🌈"
                ],
                ['sad ballad', 'heartbreak', 'emotional', 'melancholy', 'piano ballad', 'slow songs']
            ),
            new Mood(
                'chill',
                '😌',
                'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                [
                    "Take it easy. Relax and breathe. 🌊",
                    "Peace comes from within. 🧘",
                    "Chill vibes only. ✌️",
                    "In the midst of movement, find stillness. 🍃"
                ],
                ['indie chill', 'acoustic', 'lo-fi', 'relaxing', 'mellow', 'ambient']
            ),
            new Mood(
                'energetic',
                '🤩',
                'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                [
                    "Energy and persistence conquer all things! 🔥",
                    "Turn up the volume and let's go! 🚀",
                    "Feel the power, feel alive! ⚡",
                    "Life is meant to be lived with intensity! 💥"
                ],
                ['workout', 'edm', 'high energy', 'rock', 'electronic dance', 'pump up']
            ),
            new Mood(
                'romantic',
                '💕',
                'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                [
                    "Love is composed of a single soul inhabiting two bodies. 💕",
                    "In your eyes, I found my home. 💖",
                    "You are my today and all of my tomorrows. 🌹",
                    "Love is not just looking at each other, it's looking in the same direction. 💑"
                ],
                ['love songs', 'romantic', 'r&b love', 'soul', 'wedding songs', 'valentine']
            ),
            new Mood(
                'motivated',
                '💪',
                'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                [
                    "Success is not final, failure is not fatal. Keep going! 💪",
                    "The only way to do great work is to love what you do. 🎯",
                    "Believe you can and you're halfway there. 🚀",
                    "Don't watch the clock; do what it does. Keep going. ⏰"
                ],
                ['motivational', 'inspiring', 'powerful', 'anthems', 'epic music', 'empowering']
            ),
            new Mood(
                'nostalgic',
                '🌅',
                'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                [
                    "Nostalgia is a file that removes the rough edges from the good old days. 🌅",
                    "Memory is the diary we all carry with us. 📖",
                    "The past beats inside me like a second heart. 💜",
                    "Those were the days, my friend. We thought they'd never end. 🎵"
                ],
                ['80s hits', '90s music', 'classic rock', 'retro', 'throwback', 'oldies']
            ),
            new Mood(
                'peaceful',
                '🕊️',
                'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                [
                    "Peace is the result of retraining your mind to process life as it is. 🕊️",
                    "In the midst of chaos, there is also opportunity. 🌊",
                    "Quiet the mind and the soul will speak. 🧘‍♀️",
                    "Peace comes from within. Do not seek it without. 💙"
                ],
                ['meditation', 'instrumental', 'spa music', 'piano peaceful', 'calm', 'nature']
            )
        ];
    },

    /**
     * Render mood buttons dynamically
     */
    renderMoodButtons: function() {
        const container = document.getElementById('moodSelector');
        container.innerHTML = '';
        
        appState.moods.forEach(mood => {
            const button = document.createElement('button');
            button.className = `mood-btn ${mood.name}`;
            button.innerHTML = `
                <span class="mood-emoji">${mood.emoji}</span>
                <span class="mood-label">${this.capitalizeFirst(mood.name)}</span>
            `;
            button.onclick = () => this.selectMood(mood);
            container.appendChild(button);
        });
    },

    /**
     * CLASS REQUIREMENT 4: INPUT VALIDATION
     * Validate and add custom mood
     */
    addCustomMood: function() {
        const input = document.getElementById('customMoodInput');
        const errorMsg = document.getElementById('errorMessage');
        const moodName = input.value.trim().toLowerCase();
        
        // Clear previous error
        errorMsg.classList.remove('show');
        
        // Validation: Check if empty
        if (moodName === '') {
            this.showError('Please enter a mood name!');
            return;
        }
        
        // Validation: Check minimum length
        if (moodName.length < 3) {
            this.showError('Mood name must be at least 3 characters!');
            return;
        }
        
        // Validation: Check maximum length
        if (moodName.length > 20) {
            this.showError('Mood name must be less than 20 characters!');
            return;
        }
        
        // Validation: Check for special characters
        if (!/^[a-zA-Z\s]+$/.test(moodName)) {
            this.showError('Mood name can only contain letters!');
            return;
        }
        
        // Validation: Check for duplicates
        const isDuplicate = appState.moods.some(mood => 
            mood.name.toLowerCase() === moodName
        );
        
        if (isDuplicate) {
            this.showError('This mood already exists!');
            return;
        }
        
        // Create new custom mood
        const customMood = new Mood(
            moodName,
            '🎵',
            'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            [
                `Feeling ${moodName}? Let the music match your vibe! 🎵`,
                `Your ${moodName} playlist is ready! ✨`,
                `Music for your ${moodName} mood! 🎶`
            ],
            [moodName, `${moodName} music`, `${moodName} songs`, 'popular', 'top hits', 'trending']
        );
        
        appState.moods.push(customMood);
        appState.customMoods.push(moodName);
        this.saveToLocalStorage();
        this.renderMoodButtons();
        
        // Clear input and show success
        input.value = '';
        this.showError('✅ Custom mood added successfully!', true);
        
        // Auto-select the new mood
        setTimeout(() => {
            this.selectMood(customMood, false);
        }, 1000);
    },

    /**
     * Display validation error messages
     */
    showError: function(message, isSuccess = false) {
        const errorMsg = document.getElementById('errorMessage');
        errorMsg.textContent = message;
        errorMsg.style.color = isSuccess ? '#10b981' : '#ef4444';
        errorMsg.classList.add('show');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            errorMsg.classList.remove('show');
        }, 3000);
    },

    /**
     * Select a mood and load playlist
     */
    selectMood: async function(mood, isAutoLoad = false) {
        // Update mood selection count only if user manually clicked
        if (!isAutoLoad) {
            mood.select();
            appState.statistics.moodCount++;
        }
        
        appState.currentMood = mood;
        
        // Update UI
        this.updateActiveMood(mood.name);
        this.updateBackground(mood.gradient);
        this.showQuote(mood.getRandomQuote());
        this.showInputSection();
        this.updateStatistics();
        
        // Fetch and display playlist
        await this.loadPlaylist(mood);
    },

    /**
     * Update active mood button styling
     */
    updateActiveMood: function(moodName) {
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.mood-btn.${moodName}`)?.classList.add('active');
    },

    /**
     * Update background gradient
     */
    updateBackground: function(gradient) {
        document.body.style.background = gradient;
    },

    /**
     * Display motivational quote
     */
    showQuote: function(quote) {
        const quoteCard = document.getElementById('quoteCard');
        const quoteText = document.getElementById('quoteText');
        
        quoteText.textContent = quote;
        quoteCard.classList.add('show');
    },

    /**
     * Show custom mood input section
     */
    showInputSection: function() {
        document.getElementById('inputSection').classList.add('show');
    },

    /**
     * CLASS REQUIREMENT 5: API USAGE
     * Dynamically search iTunes with random keyword from mood
     */
    loadPlaylist: async function(mood) {
        const playlistSection = document.getElementById('playlistSection');
        const playlistContainer = document.getElementById('playlistContainer');
        const playlistTitle = document.getElementById('playlistTitle');
        
        // Show loading state
        playlistSection.classList.add('show');
        playlistContainer.innerHTML = '<div class="loading">🎵 Searching iTunes for perfect songs...</div>';
        
        try {
            // Get a random keyword from the mood
            const searchKeyword = mood.getRandomKeyword();
            
            // Search iTunes with the keyword
            const response = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(searchKeyword)}&media=music&entity=song&limit=50`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch songs');
            }
            
            const data = await response.json();
            
            // Filter songs that have previews
            const songsWithPreviews = data.results.filter(item => item.previewUrl);
            
            // Shuffle the results to get random songs each time
            const shuffled = songsWithPreviews.sort(() => 0.5 - Math.random());
            
            // Take 5 random songs
            const selectedSongs = shuffled.slice(0, 5);
            
            // Convert to Song objects
            const songs = selectedSongs.map(item => new Song(
                item.trackName,
                item.artistName,
                item.previewUrl,
                item.artworkUrl100
            ));
            
            appState.currentPlaylist = songs;
            appState.statistics.songCount += songs.length;
            this.updateStatistics();
            this.saveToLocalStorage();
            
            // Display playlist
            playlistTitle.textContent = `Your ${this.capitalizeFirst(mood.name)} Playlist 🎵`;
            this.renderPlaylist(songs);
            
        } catch (error) {
            console.error('Error loading playlist:', error);
            playlistContainer.innerHTML = `
                <div class="error" style="background: #fee; padding: 30px; border-radius: 16px; color: #dc2626;">
                    ⚠️ Oops! Couldn't load songs. Please try again.
                </div>
            `;
        }
    },

    /**
     * Render playlist with enhanced audio controls
     */
    renderPlaylist: function(songs) {
        const container = document.getElementById('playlistContainer');
        
        if (songs.length === 0) {
            container.innerHTML = '<div class="loading">No songs found. Try shuffling for different results!</div>';
            return;
        }
        
        container.innerHTML = songs.map((song, index) => `
            <div class="song-item" style="animation-delay: ${index * 0.1}s">
                <div class="song-header">
                    <img src="${song.artworkUrl}" alt="Album art" class="album-art">
                    <div class="song-info">
                        <div class="song-title">${this.escapeHtml(song.trackName)}</div>
                        <div class="song-artist">${this.escapeHtml(song.artistName)}</div>
                    </div>
                    <button class="play-btn" onclick="app.togglePlay(${index}, this)">
                        ▶
                    </button>
                </div>
                <div class="audio-controls" id="controls-${index}">
                    <div class="progress-bar-container">
                        <div class="progress-info">
                            <span id="current-time-${index}">0:00</span>
                            <span id="duration-${index}">0:30</span>
                        </div>
                        <div class="progress-bar" onclick="app.seekTo(event, ${index})">
                            <div class="progress-fill" id="progress-${index}"></div>
                        </div>
                    </div>
                    <div class="volume-control">
                        <span class="volume-icon">🔊</span>
                        <input type="range" class="volume-slider" min="0" max="100" value="70" 
                               oninput="app.setVolume(${index}, this.value)">
                        <span class="volume-value" id="volume-value-${index}">70%</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /**
     * Toggle audio playback with enhanced controls
     */
    togglePlay: function(songIndex, button) {
        const song = appState.currentPlaylist[songIndex];
        const controlsDiv = document.getElementById(`controls-${songIndex}`);
        
        // If clicking the same song that's playing
        if (appState.currentAudio && appState.currentSongIndex === songIndex) {
            if (appState.currentAudio.paused) {
                appState.currentAudio.play();
                button.textContent = '⏸';
            } else {
                appState.currentAudio.pause();
                button.textContent = '▶';
            }
        } else {
            // Stop previous audio
            if (appState.currentAudio) {
                appState.currentAudio.pause();
                document.querySelectorAll('.play-btn').forEach(btn => btn.textContent = '▶');
                document.querySelectorAll('.audio-controls').forEach(ctrl => ctrl.classList.remove('show'));
            }
            
            // Play new audio
            appState.currentAudio = new Audio(song.previewUrl);
            appState.currentAudio.volume = 0.7;
            appState.currentSongIndex = songIndex;
            appState.currentAudio.play();
            button.textContent = '⏸';
            
            // Show audio controls
            controlsDiv.classList.add('show');
            
            // Update statistics
            if (!song.hasBeenPlayed) {
                song.play();
                appState.statistics.playCount++;
                this.updateStatistics();
                this.saveToLocalStorage();
            }
            
            // Update progress bar
            appState.currentAudio.addEventListener('timeupdate', () => {
                this.updateProgress(songIndex);
            });
            
            // Reset when song ends
            appState.currentAudio.addEventListener('ended', () => {
                button.textContent = '▶';
                controlsDiv.classList.remove('show');
            });
        }
    },

    /**
     * Update progress bar
     */
    updateProgress: function(songIndex) {
        if (!appState.currentAudio) return;
        
        const progressFill = document.getElementById(`progress-${songIndex}`);
        const currentTimeSpan = document.getElementById(`current-time-${songIndex}`);
        
        const currentTime = appState.currentAudio.currentTime;
        const duration = appState.currentAudio.duration;
        
        if (duration) {
            const percentage = (currentTime / duration) * 100;
            progressFill.style.width = percentage + '%';
            currentTimeSpan.textContent = this.formatTime(currentTime);
        }
    },

    /**
     * Seek to position in song
     */
    seekTo: function(event, songIndex) {
        if (!appState.currentAudio || appState.currentSongIndex !== songIndex) return;
        
        const progressBar = event.currentTarget;
        const clickX = event.offsetX;
        const width = progressBar.offsetWidth;
        const duration = appState.currentAudio.duration;
        
        const seekTime = (clickX / width) * duration;
        appState.currentAudio.currentTime = seekTime;
    },

    /**
     * Set volume
     */
    setVolume: function(songIndex, value) {
        if (appState.currentAudio && appState.currentSongIndex === songIndex) {
            appState.currentAudio.volume = value / 100;
        }
        document.getElementById(`volume-value-${songIndex}`).textContent = value + '%';
    },

    /**
     * Format time in MM:SS
     */
    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Shuffle - searches iTunes again with a random keyword to get completely new songs
     */
    shufflePlaylist: function() {
        if (appState.currentMood) {
            // Stop current audio
            if (appState.currentAudio) {
                appState.currentAudio.pause();
                appState.currentAudio = null;
                appState.currentSongIndex = null;
            }
            
            // Load new playlist - will use a different random keyword
            this.loadPlaylist(appState.currentMood);
        }
    },

    /**
     * Update statistics display
     */
    updateStatistics: function() {
        document.getElementById('moodCount').textContent = appState.statistics.moodCount;
        document.getElementById('songCount').textContent = appState.statistics.songCount;
        document.getElementById('playCount').textContent = appState.statistics.playCount;
    },

    /**
     * Save data to localStorage
     */
    saveToLocalStorage: function() {
        localStorage.setItem('moodTunesStats', JSON.stringify(appState.statistics));
        localStorage.setItem('moodTunesCustomMoods', JSON.stringify(appState.customMoods));
        if (appState.currentMood) {
            localStorage.setItem('moodTunesLastMood', appState.currentMood.name);
        }
    },

    /**
     * Load data from localStorage
     */
    loadFromLocalStorage: function() {
        // Load statistics
        const savedStats = localStorage.getItem('moodTunesStats');
        if (savedStats) {
            appState.statistics = JSON.parse(savedStats);
        }
        
        // Load custom moods
        const savedCustomMoods = localStorage.getItem('moodTunesCustomMoods');
        if (savedCustomMoods) {
            const customMoods = JSON.parse(savedCustomMoods);
            customMoods.forEach(moodName => {
                const customMood = new Mood(
                    moodName,
                    '🎵',
                    'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    [
                        `Feeling ${moodName}? Let the music match your vibe! 🎵`,
                        `Your ${moodName} playlist is ready! ✨`
                    ],
                    [moodName, `${moodName} music`, `${moodName} songs`, 'popular', 'top hits']
                );
                appState.moods.push(customMood);
            });
            appState.customMoods = customMoods;
        }
        
        // Auto-load last mood
        const lastMood = localStorage.getItem('moodTunesLastMood');
        if (lastMood) {
            const mood = appState.moods.find(m => m.name === lastMood);
            if (mood) {
                setTimeout(() => this.selectMood(mood, true), 500);
            }
        }
    },

    /**
     * Utility: Capitalize first letter
     */
    capitalizeFirst: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Utility: Escape HTML to prevent XSS
     */
    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
};

// Initialize app when page loads
window.addEventListener('load', () => {
    app.init();
});