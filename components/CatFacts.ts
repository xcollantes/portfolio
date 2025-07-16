/** Cat facts component. */

import { toast } from 'sonner';

const CAT_FACTS = [
  "Cats have five toes on their front paws, but only four toes on their back paws.",
  "A group of cats is called a 'clowder' and a group of kittens is called a 'kindle'.",
  "Cats can't taste sweetness due to a genetic mutation that affects their taste receptors.",
  "A cat's purr vibrates at a frequency of 25-50 Hz, which can help heal bones and reduce pain.",
  "Cats sleep 12-16 hours per day, which is about 70% of their lives.",
  "The oldest known pet cat existed 9,000 years ago in Cyprus.",
  "Cats have a third eyelid called a 'nictitating membrane' that helps protect their eyes.",
  "A cat's whiskers are roughly as wide as their body, helping them gauge if they can fit through spaces.",
  "Cats have a specialized collarbone that allows them to always land on their feet.",
  "House cats share 95.6% of their genetic makeup with tigers.",
  "Cats can make over 100 vocal sounds, while dogs can only make about 10.",
  "A cat's heart beats nearly twice as fast as a human heart, at 110-140 beats per minute.",
  "Cats have excellent night vision and can see at light levels six times lower than humans.",
  "The ridged pattern on a cat's nose pad is unique, like a human fingerprint.",
  "Cats have 32 muscles that control their outer ears, compared to humans' 6.",
  "A cat's average lifespan is 13-17 years, with indoor cats typically living longer.",
  "Cats can rotate their ears 180 degrees to better locate sounds.",
  "The world's oldest cat lived to be 38 years old.",
  "Cats have a reflective layer behind their retinas called 'tapetum lucidum' that makes their eyes glow.",
  "A cat's brain is biologically closer to a human brain than a dog's brain.",
  "Cats can run up to 30 mph in short bursts.",
  "A cat's tongue has tiny backward hooks called 'papillae' that help them groom effectively.",
  "Cats have scent glands on their faces, paws, and flanks for marking territory.",
  "The heaviest domestic cat on record weighed 46 pounds.",
  "Cats have been domesticated for approximately 4,000 years.",
  "A cat's flexible spine has 30 vertebrae, which is 6 more than humans.",
  "Cats can't move their jaw sideways, so they can't chew large chunks of food.",
  "The technical term for a cat's hairball is a 'bezoar'.",
  "Cats have a special scent organ called the 'Jacobson's organ' on the roof of their mouth.",
  "A falling cat will always right itself in the same way, regardless of height."
];

/**
 * Get a random cat fact from the collection.
 * @returns A random cat fact string.
 */
export default function showCatFact(): void {
  const fact = CAT_FACTS[Math.floor(Math.random() * CAT_FACTS.length)]

  toast.info(`🐱 Cat Fact: ${fact}`)
};