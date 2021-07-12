export const isOwner = ({ uid }) => (ref) => ref.where(`roles.${uid}`, '==', 'owner')
export const canRead = ({ uid }) => (ref) => ref.where(`roles.${uid}`, 'in', ['owner', 'reader', 'writer'])
export const canWrite = ({ uid }) => (ref) => ref.where(`roles.${uid}`, 'in', ['owner', 'writer'])