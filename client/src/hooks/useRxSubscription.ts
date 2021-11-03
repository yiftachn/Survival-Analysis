import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";

function useRxSubscription<T>(subsbcribable: BehaviorSubject<T>, onChange?: (newVal: T) => void): [T, (newVal: T) => void] {
    const [value, setValue] = useState<T>(subsbcribable.value);
    useEffect(() => {
        const subscription = subsbcribable.subscribe(
            (newValue) => {
                setValue(newValue);
                if (onChange) {
                    onChange(newValue);
                }
            }
        );
        return () => {
            subscription.unsubscribe();
        };
    }, [subsbcribable]);

    return [value, (nextVal: T) => subsbcribable.next(nextVal)];
}

export default useRxSubscription;