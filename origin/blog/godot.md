# Breaking Godot Encyrption
## By FoxMoss
### Sun Feb  9 09:56:31 PM CST 2025
Something pissed my off the past weekend, it started off with a video. A game developer made a devlog talking about preventing cheating in the a Godot game. Godot's build system basically just packages your source files then ships that off to users in a bundle with a runner, so its fairly trivial to unpack a game if unencrypted. I was confidant I could easily hack the game in an hour or to. Projects like [GDRE](https://github.com/GDRETools/gdsdecomp) exist to make the process near instant, if its encrypted you need to do a little more work. GDRE supports setting a key so all you have to do is get the key. 
![[Pasted image 20250209190727.png]]
I started looking for ways to extract the key, when I saw the second thing that really pissed me off. 
![[Pasted image 20250209190925.png]]
The Godot docs were calling me a script kiddie, and if I couldn't break this encryption I was stupid. So hi if you're a script kiddie you're in the right place. You're going to learn how to break encryption in your favorite Godot 4.3 game, and maybe if you read these words you learn something about assembly.

Just for demo, I'm using my own blank Godot game to crack with the example key. Before we open up Ghidra we need to understand how Godot does decryption, it uses [decrypt_cfb](https://github.com/godotengine/godot/blob/master/core/crypto/crypto_core.h#L107C20-L107C93) and [set_encode_key](https://github.com/godotengine/godot/blob/master/core/crypto/crypto_core.h#L100C9-L100C23) and it does that [here](https://github.com/godotengine/godot/blob/master/core/io/file_access_encrypted.cpp#L90) the two functions are really just wrappers for [mbedtls](https://mbed-tls.readthedocs.io/en/latest/index.html) functions [mbedtls_aes_crypt_cfb128](https://github.com/godotengine/godot/blob/master/core/crypto/crypto_core.cpp#L212C12-L212C36) and [mbedtls_aes_setkey_enc](https://github.com/godotengine/godot/blob/master/core/crypto/crypto_core.cpp#L175C12-L175C34). So I first wrote up a demo program that just used these functions in my own C++ to verify how it worked. When doing that, I had an idea I could just cross reference each function in Godot executable with a library copy of mbedtls to find where each mbedtls function had been packed.  The instructions won't be exact since I didn't want to bother with compiling the Godot runners myself with symbols turned on, but there'll be enough context to make educated guesses. My first target was mbedtls_aesni_has_support because I made a guess that the CPUID instruction didn't appear very frequently. And mbedtls_aesni_has_support is used in mbedtls_aes_setkey_enc.
![[Pasted image 20250209193249.png]]
Finally I find a function that matches what I'm looking for.
![[Pasted image 20250209212859.png]]
And using it is a function that looks familiar....
![[Pasted image 20250209213040.png]]
The 0xc0, 0x100, and 0x80 constants were big indicators since 0x100 in decimal is 256 the same number that [gets passed through](https://github.com/godotengine/godot/blob/36d90c73a843afa2807a0b8dcbfbf52bdb8a759c/core/io/file_access_encrypted.cpp#L90). We're basically done now. We now have a location where our key is going to be sent, we just need to hook into the location in GDB. The problem is the address Ghidra gives us, isn't the one that GDB lets us set a breakpoint at. 

So we can instead set a breakpoint an a standard library function we can guess is only going to get run once at the start of excecution. 

In GDB now we can see what the debugger thinks the address of the instruction is.
![[Pasted image 20250209213420.png]]
![[Pasted image 20250209213338.png]]
![[Pasted image 20250209213727.png]]So we can breakpoint our target function now, and the Ghidra of the library shows us where our variables are going to be. 
![[Pasted image 20250209213825.png]] ![[Pasted image 20250209200245.png]]
Then we just keep cycling the function until one of the keys matches, or you could do more work to find out the specific decryption call you need.
![[Pasted image 20250209215242.png]]
Format and put that key into GDRE and voila, we have our unencrypted game files.
![[Pasted image 20250209215449.png]]

If you're better with Ghidra feel free to email me revisions at foxmoss@mediaology.com or on discord as foxmoss_
