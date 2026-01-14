<script setup lang="ts">
import CalendarEventHandler from '@/views/base-ui/apps/calendar/CalendarEventHandler.vue';
import { blankEvent, useCalendar } from '@/views/base-ui/apps/calendar/useCalendar';
import { useCalendarStore } from '@/views/base-ui/apps/calendar/useCalendarStore';
import FullCalendar from '@fullcalendar/vue3';

const router = useRouter();
const ability = useAbility();
const openCalendar = ref(false);

// 👉 Store
const store = useCalendarStore();

// 👉 Event
const event = ref(structuredClone(blankEvent));
const isEventHandlerSidebarActive = ref(false);

watch(isEventHandlerSidebarActive, (val) => {
  if (!val) event.value = structuredClone(blankEvent);
});

const { isLeftSidebarOpen } = useResponsiveLeftSidebar();

// 👉 useCalendar
const {
  refCalendar,
  calendarOptions,
  addEvent,
  updateEvent,
  removeEvent,
  jumpToDate,
} = useCalendar(event, isEventHandlerSidebarActive, isLeftSidebarOpen);

const toggleCalendar = () => {
  openCalendar.value = !openCalendar.value;
};

// SECTION Sidebar
// 👉 Check all
const checkAll = computed({
  /*
    GET: Return boolean `true` => if length of options matches length of selected filters => Length matches when all events are selected
    SET: If value is `true` => then add all available options in selected filters => Select All
          Else if => all filters are selected (by checking length of both array) => Empty Selected array  => Deselect All
  */
  get: () => store.selectedCalendars.length === store.availableCalendars.length,
  set: (val) => {
    if (val)
      store.selectedCalendars = store.availableCalendars.map((i) => i.label);
    else if (store.selectedCalendars.length === store.availableCalendars.length)
      store.selectedCalendars = [];
  },
});
// !SECTION

const jumpToDateFn = (date: string) => {
  jumpToDate(date);
};
</script>

<template>
  <IconBtn id="calendar-btn" @click="toggleCalendar">
    <VIcon icon="tabler-calendar-smile" />
  </IconBtn>

  <VDialog
    :model-value="openCalendar"
    @update:model-value="(val) => (openCalendar = val)"
    width="100vw"
    height="90vh"
    
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="toggleCalendar" iconSize="24" />

    <!-- Dialog Content -->
    <VCard title="Calendar" class="p-4">
      <div class="div overflow-hidden">
        <VCard >
          <!-- `z-index: 0` Allows overlapping vertical nav on calendar -->
          <VLayout style="z-index: 0">
            <!-- 👉 Navigation drawer -->
            <VNavigationDrawer
              v-model="isLeftSidebarOpen"
              width="292"
              absolute
              touchless
              location="start"
              class="calendar-add-event-drawer"
              :temporary="$vuetify.display.mdAndDown"
            >
              <div style="margin: 1.5rem">
                <VBtn
                  block
                  prepend-icon="tabler-plus"
                  @click="isEventHandlerSidebarActive = true"
                >
                  Add event
                </VBtn>
              </div>

              <VDivider />

              <div class="d-flex align-center justify-center pa-2">
                <AppDateTimePicker
                  :model-value="new Date().toJSON().slice(0, 10)"
                  :config="{ inline: true }"
                  class="calendar-date-picker"
                  @update:model-value="jumpToDateFn"
                />
              </div>

              <VDivider />
              <div class="pa-6">
                <h6 class="text-lg font-weight-medium mb-4">Event Filters</h6>

                <div class="d-flex flex-column calendars-checkbox">
                  <VCheckbox v-model="checkAll" label="View all" />
                  <VCheckbox
                    v-for="calendar in store.availableCalendars"
                    :key="calendar.label"
                    v-model="store.selectedCalendars"
                    :value="calendar.label"
                    :color="calendar.color"
                    :label="calendar.label"
                  />
                </div>
              </div>
            </VNavigationDrawer>

            <VMain>
              <VCard flat>
                <FullCalendar ref="refCalendar" :options="{...calendarOptions, height: '85vh'}" />
              </VCard>
            </VMain>
          </VLayout>
        </VCard>
        <CalendarEventHandler
          v-model:isDrawerOpen="isEventHandlerSidebarActive"
          :event="event"
          @add-event="addEvent"
          @update-event="updateEvent"
          @remove-event="removeEvent"
        />
      </div>
    </VCard>
  </VDialog>
</template>
