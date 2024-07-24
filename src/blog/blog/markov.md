# User fingerprinting with Markov chains 
### By FoxMoss

I've had an interest in the unique way each individual types for a long time,
almost a digital accent that can identify you to a group of people. The way you
use emojis, and capitalization, and punctuation can quickly sort you into an age
demographic by a viewer in a matter of seconds. You need text if you understand
the meaning or not to already start building a mental model of who someone is.

This blog post describes how I automated this process of identification via
text and explore its ramifications.

## A primer on Markov chains

If you're reading this blog post you may have a decent understanding on
Markov chains, if that is the case feel free to skip this section.

![Joxemai4, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via
Wikimedia Commons](/blog/markovchain.png)

Markov chains are models of probability, with nodes representing events and
edges representing the probability of one event happening after another. They
have a whole bunch of nerdy uses that probably saves lives that you can read
about on [Wikipedia](https://en.wikipedia.org/wiki/Markov_chain), which to be
completely honest I am severely under qualified to talk about. Where you
probably have actually seen Markov chains before are in the little typing
suggestion box above your mobile keyboard. 

![](/blog/suggest.png)

This was likely done with a fairly common text generation method in a pre-LLM
world.

So first you take a collection text from whatever source you're aiming to 
imitate, and tokenize it out.

![](/blog/tokens.png)

These tokens become the nodes of our graph, and we can connect them up by their
sequence in the text. Then weight them based on the likelihood of that token
pair appearing in the text.

![](/blog/probabilities.png)

If we traverse this graph we either get "i think therefore i am" or "i am".
Riveting stuff, but as you go to larger and larger data sets it creates more
novel but still meaningless sentences.

## Identification

So if we can get messages out of the Markov chain and see the probability of
each step, why can't we reverse the process and see how close any message
matches the Markov chain. So a quick addition to the Markov chain code I loop
through the pairs of tokens and check the score between the two then average all
the scores out to produce a final score. The implementation was so easy, I got a
proof of concept working in about afternoon. I felt a bit bad for how simple the
project was and started adding CSV processing features just to fluff it up.

So does it work? Some preliminary tests were encouraging, and eventually I got
exports from Discord working. The chain flawless ranked ranked my messages from
two different channels when compared to 10 other users messages.

![Comparisons to /home/foxmoss/People/foxmoss-altchannel.csv, messages from a
private developer community](/blog/firstresults.png)

Now admittedly this is a bit hard to parse out, humans aren't great at
visualizing numbers.

![](/blog/firstgraph.png)

This makes it a bit clearer, the correct answers are only ahead by a small
margin. This is to be expected, it's a statistical model and English text will
likely find itself falling into similar patterns, but whats good is there's a
visible difference where you can see where it matches and where it doesn't.

Comparing the same people to a random person in the data:

![Graph of comparisons to a random user.](/blog/nocorelationgraph.png)

It looks basically the same, great. There's some change in the data when
two message sources are written by the same person.

Now how would I quantify this difference to prevent false positives in an purely
automated system is beyond me. I would like to do more testing on just the raw
accuracy but finding data on a larger scale, especially while keeping all
parties involved consenting. So I will leave further research past "Does it
work?" as an exercise for the reader, or for a later blog.

## Avoiding detection

I attempted the original test again but this time with an alt account on a
different server where I was intentionally speaking different, even with this
the result came back as accurate as before, maybe even more clear cut.

![](/blog/altgraph.png)

But typing different likely does have an effect as I took
these messages on an alt account and ran them through the Claude (though likely
any LLM would work) and got it to rephrase my messages. After running it through
the chain again something quite interesting happened.

![](/blog/ai.png)
![](/blog/aigraph.png)

The new Claude dataset matched closely with the alt dataset which make sense but
not my other datasets. More testing is of course needed but using an AI to
reformat right now seems like a good way to mask your typing style.

Though a problem might arise as you try not navigate having more identities as
the new AI guided typing style is now likely equally detectable.

## Ethics.

While looking for testing data, as soon as I brought up this concept in some
public Discord servers many people's gut reaction was of fear and was of genuine
concern. What was stated of the heart of the concern was a lack of consent in
data collection which would likely happen in junction with the project if it was
released to the public. My internal defense to this argument was that the big
corporation were already doing this. Would I not prefer an individual to be
collecting data with less of an ability to do something with that data (eg. Sell
it like a mega corp has resources to do.) but still have the ability to stalk
users and cause serious harm. Or leave it for the mega corps and hope that
corporate America has it in itself to stay that last shred ethical and
accountable. Instead of making people aware of the risks of posting anything on
the internet and how they can potentially avoid being detected by the system.

My decision to release this comes down to the easy it took to write. This would
have been equally possible in 1999 as it is today and I doubt I am the first to
utilize this technique. Be responsible.

## Conclusion

Here's a [link to my implementation](https://github.com/FoxMoss/foxmarkov) it
has pretty good help documentation. Feel free to contribute.

Shout out to [Mercury Workshop](https://mercurywork.shop/) for helping with data
collection.

If you want to reach out check out my personal page for my email and the works.

Please donate if you liked the blog post.

Monero: *49A955UvYmEBWWTXcxe3vd7YnBpGa85hu88Gx1TrJpELFb6QNLapTJ1SAtVMqrwFePBdnKgpgGdizPsN5MCeDoEA6PF7HW1*

Paypal: [paypal.com/donate/?hosted_button_id=DBWDWVZF7JFEC](https://www.paypal.com/donate/?hosted_button_id=DBWDWVZF7JFEC)
