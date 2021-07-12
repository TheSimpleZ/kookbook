export const isOwner = ({ uid }) => (ref) => ref.where(`roles.${uid}`, '==', 'owner')
export const canRead = ({ uid }) => (ref) => ref.where(`roles.${uid}`, 'in', ['owner', 'reader', 'writer'])