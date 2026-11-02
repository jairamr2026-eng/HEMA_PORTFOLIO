export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'research' | 'contact';

export interface SectionTarget {
  id: SectionId;
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
}
